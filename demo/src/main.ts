import * as d3 from 'd3';
import { getSunTimes } from 'sunrise-sunset-js';

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
}

function dateToFractionalHour(date: Date | null): number | null {
    if (!date) return null;
    return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
}

function generateYearlyData(lat: number, lng: number): DayData[] {
    const data: DayData[] = [];
    const year = new Date().getFullYear();

    for (let day = 0; day < 365; day++) {
        const date = new Date(year, 0, day + 1);
        const times = getSunTimes(lat, lng, date);

        data.push({
            date,
            sunrise: dateToFractionalHour(times.sunrise),
            sunset: dateToFractionalHour(times.sunset),
            civilDawn: dateToFractionalHour(times.twilight?.civilDawn ?? null),
            civilDusk: dateToFractionalHour(times.twilight?.civilDusk ?? null),
            nauticalDawn: dateToFractionalHour(times.twilight?.nauticalDawn ?? null),
            nauticalDusk: dateToFractionalHour(times.twilight?.nauticalDusk ?? null),
            astronomicalDawn: dateToFractionalHour(times.twilight?.astronomicalDawn ?? null),
            astronomicalDusk: dateToFractionalHour(times.twilight?.astronomicalDusk ?? null),
        });
    }
    return data;
}

function renderChart(lat: number, lng: number) {
    const data = generateYearlyData(lat, lng);
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
            .y0(d => y(d.astronomicalDawn ?? 0))
            .y1(d => y(d.astronomicalDusk ?? 24))
            .curve(d3.curveBasis));

    // Nautical Twilight
    svg.append('path')
        .datum(data)
        .attr('fill', colors.nautical)
        .attr('d', d3.area<DayData>()
            .x(d => x(d.date))
            .y0(d => y(d.nauticalDawn ?? 0))
            .y1(d => y(d.nauticalDusk ?? 24))
            .curve(d3.curveBasis));

    // Civil Twilight
    svg.append('path')
        .datum(data)
        .attr('fill', colors.civil)
        .attr('d', d3.area<DayData>()
            .x(d => x(d.date))
            .y0(d => y(d.civilDawn ?? 0))
            .y1(d => y(d.civilDusk ?? 24))
            .curve(d3.curveBasis));

    // Daylight
    svg.append('path')
        .datum(data)
        .attr('fill', colors.day)
        .attr('d', d3.area<DayData>()
            .x(d => x(d.date))
            .y0(d => y(d.sunrise ?? 12))
            .y1(d => y(d.sunset ?? 12))
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
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">${d.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</div>
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
