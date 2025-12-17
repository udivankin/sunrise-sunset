import * as d3 from 'd3';
import { getSunTimes, getSolarPosition } from 'sunrise-sunset-js';

interface DayData {
    date: Date;
    sunrise: number | null;
    sunset: number | null;
    civilDawn: number | null;
    civilDusk: number | null;
    nauticalDawn: number | null;
    nauticalDusk: number | null;
    astronomicalDawn: number | null;
    astronomicalDusk: number | null;
    isDaylight: boolean | { sunrise: number, sunset: number };
    isCivil: boolean | { dawn: number, dusk: number };
    isNautical: boolean | { dawn: number, dusk: number };
    isAstronomical: boolean | { dawn: number, dusk: number };
}

function dateToFractionalHour(date: Date | null, timezoneId?: string): number | null {
    if (!date) return null;
    if (timezoneId) {
        try {
            const parts = new Intl.DateTimeFormat('en-US', {
                timeZone: timezoneId,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            }).formatToParts(date);

            const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
            const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
            const second = parseInt(parts.find(p => p.type === 'second')?.value || '0');
            return hour + minute / 60 + second / 3600;
        } catch (e) {
            console.warn(`Failed to format date for timezone ${timezoneId}, falling back to local`, e);
        }
    }
    return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
}

function getOffsetHours(timeZone: string, date: Date): number {
    try {
        const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
        return (tzDate.getTime() - utcDate.getTime()) / 3600000;
    } catch (e) {
        return -date.getTimezoneOffset() / 60;
    }
}

const timezoneCache = new Map<string, string>();

async function getTimezoneId(lat: number, lng: number): Promise<string> {
    const key = `${lat.toFixed(2)},${lng.toFixed(2)}`;
    if (timezoneCache.has(key)) return timezoneCache.get(key)!;

    try {
        const response = await fetch(`https://timeapi.io/api/time/current/coordinate?latitude=${lat}&longitude=${lng}`);
        if (!response.ok) throw new Error('Timezone API failed');
        const data = await response.json();
        timezoneCache.set(key, data.timeZone);
        return data.timeZone;
    } catch (e) {
        console.warn('Failed to fetch timezone, falling back to local', e);
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}

function generateYearlyData(lat: number, lng: number, timezoneId: string): DayData[] {
    const data: DayData[] = [];
    const year = new Date().getFullYear();

    for (let day = 0; day < 365; day++) {
        const date = new Date(year, 0, day + 1);
        const offset = getOffsetHours(timezoneId, date);
        const times = getSunTimes(lat, lng, date, { timezone: offset, timezoneId });
        const noon = times.solarNoon || date;
        const noonPos = getSolarPosition(lat, lng, noon, { timezone: offset, timezoneId });

        const sunrise = dateToFractionalHour(times.sunrise, timezoneId);
        const sunset = dateToFractionalHour(times.sunset, timezoneId);
        const civilDawn = dateToFractionalHour(times.twilight?.civilDawn ?? null, timezoneId);
        const civilDusk = dateToFractionalHour(times.twilight?.civilDusk ?? null, timezoneId);
        const nauticalDawn = dateToFractionalHour(times.twilight?.nauticalDawn ?? null, timezoneId);
        const nauticalDusk = dateToFractionalHour(times.twilight?.nauticalDusk ?? null, timezoneId);
        const astronomicalDawn = dateToFractionalHour(times.twilight?.astronomicalDawn ?? null, timezoneId);
        const astronomicalDusk = dateToFractionalHour(times.twilight?.astronomicalDusk ?? null, timezoneId);

        data.push({
            date,
            sunrise,
            sunset,
            civilDawn,
            civilDusk,
            nauticalDawn,
            nauticalDusk,
            astronomicalDawn,
            astronomicalDusk,
            isDaylight: (sunrise !== null && sunset !== null) ? { sunrise, sunset } : (noonPos?.elevation ?? -90) > -0.833,
            isCivil: (civilDawn !== null && civilDusk !== null) ? { dawn: civilDawn, dusk: civilDusk } : (noonPos?.elevation ?? -90) > -6,
            isNautical: (nauticalDawn !== null && nauticalDusk !== null) ? { dawn: nauticalDawn, dusk: nauticalDusk } : (noonPos?.elevation ?? -90) > -12,
            isAstronomical: (astronomicalDawn !== null && astronomicalDusk !== null) ? { dawn: astronomicalDawn, dusk: astronomicalDusk } : (noonPos?.elevation ?? -90) > -18,
        });
    }
    return data;
}

async function renderChart(lat: number, lng: number) {
    const timezoneId = await getTimezoneId(lat, lng);

    const tzDisplay = document.getElementById('timezoneDisplay');
    if (tzDisplay) {
        const now = new Date();
        const offset = getOffsetHours(timezoneId, now);
        const sign = offset >= 0 ? '+' : '';
        tzDisplay.textContent = `${timezoneId} (UTC${sign}${offset})`;
    }

    const data = generateYearlyData(lat, lng, timezoneId);
    const container = d3.select('#chart');
    container.selectAll('*').remove();

    const width = (container.node() as HTMLElement).clientWidth;
    const height = (container.node() as HTMLElement).clientHeight;

    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g');

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date) as [Date, Date])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 24])
        .range([0, height]); // 0 at top (midnight), 24 at bottom (midnight)

    // Colors
    const colors = {
        day: '#fbbf24',
        civil: '#6366f1',
        nautical: '#3730a3',
        astronomical: '#1e1b4b',
        night: '#0c0e14'
    };

    // Night layer (background)
    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', colors.night);

    // Astronomical Twilight
    svg.append('path')
        .datum(data)
        .attr('fill', colors.astronomical)
        .attr('d', d3.area<DayData>()
            .x(d => x(d.date))
            .y0(d => {
                if (typeof d.isAstronomical === 'boolean') return d.isAstronomical ? y(0) : y(12);
                return y(d.isAstronomical.dawn);
            })
            .y1(d => {
                if (typeof d.isAstronomical === 'boolean') return d.isAstronomical ? y(24) : y(12);
                return y(d.isAstronomical.dusk);
            })
            .curve(d3.curveBasis));

    // Nautical Twilight
    svg.append('path')
        .datum(data)
        .attr('fill', colors.nautical)
        .attr('d', d3.area<DayData>()
            .x(d => x(d.date))
            .y0(d => {
                if (typeof d.isNautical === 'boolean') return d.isNautical ? y(0) : y(12);
                return y(d.isNautical.dawn);
            })
            .y1(d => {
                if (typeof d.isNautical === 'boolean') return d.isNautical ? y(24) : y(12);
                return y(d.isNautical.dusk);
            })
            .curve(d3.curveBasis));

    // Civil Twilight
    svg.append('path')
        .datum(data)
        .attr('fill', colors.civil)
        .attr('d', d3.area<DayData>()
            .x(d => x(d.date))
            .y0(d => {
                if (typeof d.isCivil === 'boolean') return d.isCivil ? y(0) : y(12);
                return y(d.isCivil.dawn);
            })
            .y1(d => {
                if (typeof d.isCivil === 'boolean') return d.isCivil ? y(24) : y(12);
                return y(d.isCivil.dusk);
            })
            .curve(d3.curveBasis));

    // Daylight
    svg.append('path')
        .datum(data)
        .attr('fill', colors.day)
        .attr('d', d3.area<DayData>()
            .x(d => x(d.date))
            .y0(d => {
                if (typeof d.isDaylight === 'boolean') return d.isDaylight ? y(0) : y(12);
                return y(d.isDaylight.sunrise);
            })
            .y1(d => {
                if (typeof d.isDaylight === 'boolean') return d.isDaylight ? y(24) : y(12);
                return y(d.isDaylight.sunset);
            })
            .curve(d3.curveBasis));

    // Subtle axes
    const xAxis = d3.axisBottom(x)
        .ticks(width > 800 ? d3.timeMonth.every(1) : d3.timeMonth.every(2))
        .tickFormat(d3.timeFormat('%b') as any)
        .tickSize(0);

    svg.append('g')
        .attr('transform', `translate(0,${height - 30})`)
        .call(xAxis)
        .attr('color', 'rgba(255,255,255,0.4)')
        .select('.domain').remove();

    const yAxis = d3.axisLeft(y)
        .ticks(12)
        .tickFormat(d => `${d}h`)
        .tickSize(-width);

    svg.append('g')
        .call(yAxis)
        .attr('color', 'rgba(255,255,255,0.05)')
        .selectAll('text')
        .attr('color', 'rgba(255,255,255,0.4)')
        .attr('x', 10)
        .attr('dy', -5)
        .style('text-anchor', 'start');

    svg.selectAll('.domain').remove();

    // Interaction
    const focus = svg.append('g')
        .style('display', 'none');

    focus.append('line')
        .attr('class', 'x-hover-line')
        .attr('y1', 0)
        .attr('y2', height)
        .attr('stroke', 'rgba(255,255,255,0.3)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,5');

    svg.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'transparent')
        .on('mouseover', () => focus.style('display', null))
        .on('mouseout', () => {
            focus.style('display', 'none');
            const tooltip = d3.select('#tooltip');
            tooltip.style('opacity', 0);
        })
        .on('mousemove', function (event) {
            const bisect = d3.bisector((d: DayData) => d.date).left;
            const pointerX = d3.pointer(event)[0];
            const x0 = x.invert(pointerX);
            const i = bisect(data, x0, 1);
            const d = data[Math.min(i - 1, data.length - 1)];

            focus.attr('transform', `translate(${x(d.date)},0)`);

            const tooltip = d3.select('#tooltip');
            const tooltipWidth = 180;
            const xPos = pointerX + 20;
            const finalX = xPos + tooltipWidth > width ? pointerX - tooltipWidth - 20 : xPos;

            tooltip.style('opacity', 1)
                .style('left', `${finalX}px`)
                .style('top', `${d3.pointer(event, container.node())[1]}px`)
                .html(`
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">${d.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', timeZone: timezoneId })}</div>
                    <div style="display: grid; grid-template-columns: auto 1fr; gap: 0.5rem; font-size: 0.85rem;">
                        <span style="color: ${colors.day}">Sunrise:</span> <span>${formatHour(d.sunrise)}</span>
                        <span style="color: ${colors.day}">Sunset:</span> <span>${formatHour(d.sunset)}</span>
                        <span style="color: ${colors.civil}">Civil Dawn:</span> <span>${formatHour(d.civilDawn)}</span>
                        <span style="color: ${colors.civil}">Civil Dusk:</span> <span>${formatHour(d.civilDusk)}</span>
                    </div>
                `);
        });
}

async function fetchLocationName(lat: number, lng: number) {
    const display = document.getElementById('locationDisplay');
    if (!display) return;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`, {
            headers: {
                'Accept-Language': 'en'
            }
        });
        const data = await response.json();

        const address = data.address;
        if (!address) {
            display.textContent = '';
            return;
        }

        const city = address.city || address.town || address.village || address.suburb || '';
        const state = address.state || '';
        const country = address.country_code?.toUpperCase() || '';

        const parts = [city, state, country].filter(Boolean);
        display.textContent = parts.join(', ');
    } catch (error) {
        console.error('Geocoding error:', error);
        display.textContent = '';
    }
}

function saveCoordinates(lat: number, lng: number) {
    localStorage.setItem('sun-times-lat', lat.toString());
    localStorage.setItem('sun-times-lng', lng.toString());
}

function loadCoordinates(): { lat: number, lng: number } {
    const lat = localStorage.getItem('sun-times-lat');
    const lng = localStorage.getItem('sun-times-lng');
    return {
        lat: lat ? parseFloat(lat) : 51.5074,
        lng: lng ? parseFloat(lng) : -0.1278
    };
}

function formatHour(h: number | null): string {
    if (h === null) return 'N/A';
    const hours = Math.floor(h);
    const minutes = Math.floor((h - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Initial state
const initial = loadCoordinates();
(document.getElementById('lat') as HTMLInputElement).value = initial.lat.toFixed(4);
(document.getElementById('lng') as HTMLInputElement).value = initial.lng.toFixed(4);
renderChart(initial.lat, initial.lng);
fetchLocationName(initial.lat, initial.lng);

// Event Listeners
document.getElementById('updateBtn')?.addEventListener('click', () => {
    const lat = parseFloat((document.getElementById('lat') as HTMLInputElement).value);
    const lng = parseFloat((document.getElementById('lng') as HTMLInputElement).value);
    if (!isNaN(lat) && !isNaN(lng)) {
        renderChart(lat, lng);
        fetchLocationName(lat, lng);
        saveCoordinates(lat, lng);
    }
});

document.getElementById('geoBtn')?.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            (document.getElementById('lat') as HTMLInputElement).value = lat.toFixed(4);
            (document.getElementById('lng') as HTMLInputElement).value = lng.toFixed(4);
            renderChart(lat, lng);
            fetchLocationName(lat, lng);
            saveCoordinates(lat, lng);
        });
    }
});

// Resize handler
window.addEventListener('resize', () => {
    const lat = parseFloat((document.getElementById('lat') as HTMLInputElement).value);
    const lng = parseFloat((document.getElementById('lng') as HTMLInputElement).value);
    renderChart(lat, lng);
});
