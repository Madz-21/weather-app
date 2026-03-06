// Stars
(function () {
    const bg = document.getElementById("skyBg");
    for (let i = 0; i < 90; i++) {
        const s = document.createElement("div");
        s.className = "star";
        const z = Math.random() * 1.8 + 0.4;
        s.style.cssText = `width:${z}px;height:${z}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;--d:${(Math.random() * 4 + 2).toFixed(1)}s;animation-delay:${(Math.random() * 5).toFixed(1)}s;opacity:.${Math.floor(Math.random() * 5 + 2)}`;
        bg.appendChild(s);
    }
})();

let unit = "C",
    raw = null,
    tz = "UTC",
    lci = null;

// Global clock removed (no longer needed)

// Local clock
function startLC(z) {
    tz = z || "UTC";
    if (lci) clearInterval(lci);
    function t() {
        const n = new Date();
        try {
            document.getElementById("lt").textContent = n.toLocaleTimeString(
                "en-US",
                { timeZone: tz, hour12: false },
            );
            document.getElementById("ld").textContent = n.toLocaleDateString(
                "en-US",
                {
                    timeZone: tz,
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                },
            );
        } catch (e) {
            document.getElementById("lt").textContent = n.toLocaleTimeString(
                "en-US",
                { hour12: false },
            );
            document.getElementById("ld").textContent = n.toLocaleDateString(
                "en-US",
                { weekday: "short", month: "short", day: "numeric" },
            );
        }
    }
    t();
    lci = setInterval(t, 1000);
}

function showSt(m, t = "err") {
    const e = document.getElementById("stb");
    e.className = "stb " + t;
    document.getElementById("stMsg").textContent = m;
    setTimeout(() => (e.className = "stb"), 5000);
}
const setLoad = (o) =>
    document.getElementById("loader").classList.toggle("on", o);

const WMO = {
    0: { d: "Clear Sky", i: "sun" },
    1: { d: "Mostly Clear", i: "sun" },
    2: { d: "Partly Cloudy", i: "sun-cloud" },
    3: { d: "Overcast", i: "cloud" },
    45: { d: "Fog", i: "fog" },
    48: { d: "Rime Fog", i: "fog" },
    51: { d: "Light Drizzle", i: "drizzle" },
    53: { d: "Moderate Drizzle", i: "drizzle" },
    55: { d: "Dense Drizzle", i: "drizzle" },
    61: { d: "Slight Rain", i: "rain" },
    63: { d: "Moderate Rain", i: "rain" },
    65: { d: "Heavy Rain", i: "rain-heavy" },
    71: { d: "Slight Snow", i: "snow" },
    73: { d: "Moderate Snow", i: "snow" },
    75: { d: "Heavy Snow", i: "snow-heavy" },
    77: { d: "Snow Grains", i: "snow" },
    80: { d: "Slight Showers", i: "showers" },
    81: { d: "Moderate Showers", i: "showers" },
    82: { d: "Violent Showers", i: "showers-heavy" },
    85: { d: "Snow Showers", i: "snow" },
    86: { d: "Heavy Snow Showers", i: "snow-heavy" },
    95: { d: "Thunderstorm", i: "thunder" },
    96: { d: "Thunderstorm w/ Hail", i: "thunder-hail" },
    99: { d: "Thunderstorm w/ Heavy Hail", i: "thunder-hail" },
};
const gw = (c) => WMO[c] || { d: "Unknown", i: "cloud" };

function wIco(type, sz) {
    sz = sz || 48;
    const sv = (b) =>
        `<svg width="${sz}" height="${sz}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${b}</svg>`;
    const cloud =
        '<path d="M36 27a10 10 0 0 0-19.2-4A7.5 7.5 0 1 0 13 37h23a7.5 7.5 0 0 0 0-15" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" fill="rgba(56,189,248,.07)"/>';
    const m = {
        sun: sv(
            '<circle cx="24" cy="24" r="9" fill="#fbbf24"/><path d="M24 7v3M24 38v3M7 24h3M38 24h3M12.5 12.5l2.1 2.1M33.4 33.4l2.1 2.1M33.4 14.6l-2.1 2.1M12.5 35.5l2.1-2.1" stroke="#fbbf24" stroke-width="1.9" stroke-linecap="round"/>',
        ),
        "sun-cloud": sv(
            '<circle cx="20" cy="17" r="8" fill="#fbbf24" opacity=".85"/>' +
            cloud,
        ),
        cloud: sv(cloud),
        fog: sv(
            cloud +
            '<path d="M11 40h26M11 34h22" stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>',
        ),
        drizzle: sv(
            cloud +
            '<path d="M18 40l-2 6M24 40l-2 6M30 40l-2 6" stroke="#60a5fa" stroke-width="1.8" stroke-linecap="round"/>',
        ),
        rain: sv(
            cloud +
            '<path d="M16 39l-3 8M24 39l-3 8M32 39l-3 8" stroke="#60a5fa" stroke-width="1.8" stroke-linecap="round"/>',
        ),
        "rain-heavy": sv(
            cloud +
            '<path d="M14 38l-3 9M21 38l-3 9M28 38l-3 9M35 38l-3 9" stroke="#3b82f6" stroke-width="1.8" stroke-linecap="round"/>',
        ),
        snow: sv(
            cloud +
            '<circle cx="18" cy="40" r="2.2" fill="#93c5fd"/><circle cx="24" cy="43" r="2.2" fill="#93c5fd"/><circle cx="30" cy="40" r="2.2" fill="#93c5fd"/>',
        ),
        "snow-heavy": sv(
            cloud +
            '<circle cx="14" cy="39" r="2.2" fill="#93c5fd"/><circle cx="21" cy="43" r="2.2" fill="#93c5fd"/><circle cx="28" cy="39" r="2.2" fill="#93c5fd"/><circle cx="35" cy="43" r="2.2" fill="#93c5fd"/>',
        ),
        showers: sv(
            cloud +
            '<path d="M16 39l-3 7M24 39l-3 7M32 39l-3 7" stroke="#60a5fa" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="2 2"/>',
        ),
        "showers-heavy": sv(
            cloud +
            '<path d="M12 38l-4 9M20 38l-4 9M28 38l-4 9M36 38l-4 9" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round"/>',
        ),
        thunder: sv(
            cloud +
            '<path d="M26 30l-5 10 5-4h-4l5-10-5 4z" fill="#fbbf24" stroke="#fbbf24" stroke-width=".5" stroke-linejoin="round"/>',
        ),
        "thunder-hail": sv(
            cloud +
            '<path d="M26 30l-5 10 5-4h-4l5-10-5 4z" fill="#fbbf24"/><circle cx="15" cy="41" r="2.2" fill="#93c5fd"/><circle cx="33" cy="41" r="2.2" fill="#93c5fd"/>',
        ),
    };
    // scale SVG
    const base = m[type] || m.cloud;
    if (sz === 48) return base;
    return base.replace(
        `width="48" height="48" viewBox="0 0 48 48"`,
        `width="${sz}" height="${sz}" viewBox="0 0 48 48"`,
    );
}

const d2c = (d) =>
    [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ][Math.round(d / 22.5) % 16];
const toF = (c) => (c * 9) / 5 + 32;
const dT = (c) => (unit === "C" ? Math.round(c) : Math.round(toF(c)));

async function geo(q) {
    const r = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&addressdetails=1&accept-language=en`,
        { headers: { "Accept-Language": "en" } },
    );
    if (!r.ok) throw new Error("geo");
    return r.json();
}
async function rgeo(la, lo) {
    const r = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${la}&lon=${lo}&format=json&addressdetails=1&accept-language=en`,
    );
    if (!r.ok) throw new Error("rgeo");
    return r.json();
}
async function getTZ(la, lo) {
    try {
        const r = await fetch(
            `https://timeapi.io/api/timezone/coordinate?latitude=${la}&longitude=${lo}`,
        );
        if (!r.ok) return "UTC";
        const d = await r.json();
        return d.timeZone || "UTC";
    } catch (e) {
        return "UTC";
    }
}
async function fetchWx(la, lo) {
    const u = `https://api.open-meteo.com/v1/forecast?latitude=${la}&longitude=${lo}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,surface_pressure,visibility,precipitation,is_day&hourly=temperature_2m,weather_code,precipitation_probability,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max,wind_speed_10m_max&timezone=auto&forecast_days=7`;
    const r = await fetch(u);
    if (!r.ok) throw new Error("wx");
    return r.json();
}

let sgT = null;
document.getElementById("sIn").addEventListener("input", function () {
    clearTimeout(sgT);
    const q = this.value.trim();
    if (q.length < 2) {
        hideSg();
        return;
    }
    sgT = setTimeout(() => ldSg(q), 320);
});
document.getElementById("sIn").addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
});
document.addEventListener("click", (e) => {
    if (!e.target.closest(".sb")) hideSg();
});
function hideSg() {
    document.getElementById("suggs").classList.remove("open");
}
async function ldSg(q) {
    try {
        const res = await geo(q);
        const box = document.getElementById("suggs");
        box.innerHTML = "";
        if (!res.length) {
            hideSg();
            return;
        }
        res.forEach((r) => {
            const el = document.createElement("div");
            el.className = "sg";
            const p = r.display_name.split(",").slice(0, 3).join(", ");
            el.innerHTML = `<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${p}`;
            el.onclick = () => {
                document.getElementById("sIn").value =
                    r.display_name.split(",")[0];
                hideSg();
                loadG(r);
            };
            box.appendChild(el);
        });
        box.classList.add("open");
    } catch (e) {
        hideSg();
    }
}

async function doSearch() {
    const q = document.getElementById("sIn").value.trim();
    if (!q) {
        showSt("Please enter a city name.");
        return;
    }
    setLoad(true);
    hideSg();
    try {
        const res = await geo(q);
        if (!res || !res.length) {
            showSt(`"${q}" not found. Try adding country name.`);
            return;
        }
        await loadG(res[0]);
    } catch (e) {
        showSt("Network error. Check connection.");
    } finally {
        setLoad(false);
    }
}

async function loadG(g) {
    setLoad(true);
    try {
        const la = parseFloat(g.lat),
            lo = parseFloat(g.lon);
        const [data, z] = await Promise.all([fetchWx(la, lo), getTZ(la, lo)]);
        raw = { la, lo, data, g, z };
        startLC(z);
        render();
        const city = g.display_name.split(",")[0];
        document.getElementById("vl").href =
            `https://api.open-meteo.com/v1/forecast?latitude=${la.toFixed(4)}&longitude=${lo.toFixed(4)}&current=temperature_2m,weather_code&timezone=auto`;
        if (document.getElementById("vlink2"))
            document.getElementById("vlink2").href =
                `https://api.open-meteo.com/v1/forecast?latitude=${la.toFixed(4)}&longitude=${lo.toFixed(4)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,precipitation&hourly=temperature_2m,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=7`;
    } catch (e) {
        showSt("Failed to load weather data.");
    } finally {
        setLoad(false);
    }
}

function useGPS() {
    if (!navigator.geolocation) {
        showSt("Geolocation not supported.");
        return;
    }
    setLoad(true);
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            try {
                const { latitude: la, longitude: lo } = pos.coords;
                const [g, data, z] = await Promise.all([
                    rgeo(la, lo),
                    fetchWx(la, lo),
                    getTZ(la, lo),
                ]);
                raw = { la, lo, data, g, z };
                const city =
                    g.address?.city ||
                    g.address?.town ||
                    g.address?.village ||
                    g.display_name.split(",")[0];
                document.getElementById("sIn").value = city;
                startLC(z);
                render();
                document.getElementById("vl").href =
                    `https://api.open-meteo.com/v1/forecast?latitude=${la.toFixed(4)}&longitude=${lo.toFixed(4)}&current=temperature_2m,weather_code&timezone=auto`;
                document.getElementById("wc2").href =
                    `https://wttr.in/${encodeURIComponent(city)}`;
            } catch (e) {
                showSt("Could not load your location.");
            } finally {
                setLoad(false);
            }
        },
        () => {
            setLoad(false);
            showSt("Location denied. Enable GPS in browser settings.");
        },
    );
}

function setUnit(u) {
    unit = u;
    document.getElementById("bC").classList.toggle("act", u === "C");
    document.getElementById("bF").classList.toggle("act", u === "F");
    document.getElementById("ul").textContent = "°" + u;
    if (raw) render();
}

function render() {
    const { la, lo, data, g, z } = raw;
    const c = data.current,
        d = data.daily,
        h = data.hourly;
    const a = g.address || {};
    const city =
        a.city ||
        a.town ||
        a.village ||
        a.county ||
        g.display_name.split(",")[0];
    const state = a.state || "";
    const cc = (a.country_code || "").toUpperCase();
    document.getElementById("cn").textContent =
        city + (state ? `, ${state}` : "");
    document.getElementById("ct").textContent =
        cc || g.display_name.split(",").pop().trim();
    document.getElementById("co").textContent =
        `${la.toFixed(4)}°, ${lo.toFixed(4)}°`;
    const w = gw(c.weather_code);
    document.getElementById("ct2").textContent = dT(c.temperature_2m);
    document.getElementById("fl").textContent =
        `${dT(c.apparent_temperature)}°${unit}`;
    document.getElementById("wd").textContent = w.d;
    document.getElementById("wib").innerHTML = wIco(w.i, 66);
    document.getElementById("qh").textContent =
        `${c.relative_humidity_2m}%`;
    document.getElementById("qw").textContent =
        `${Math.round(c.wind_speed_10m)} km/h`;
    document.getElementById("qp").textContent =
        `${Math.round(c.surface_pressure)} hPa`;
    const vis =
        c.visibility >= 1000
            ? `${(c.visibility / 1000).toFixed(1)} km`
            : `${c.visibility} m`;
    document.getElementById("qv").textContent = vis;
    document
        .getElementById("wa")
        .setAttribute("transform", `rotate(${c.wind_direction_10m},55,55)`);
    document.getElementById("wdt").textContent =
        `${d2c(c.wind_direction_10m)} ${Math.round(c.wind_speed_10m)} km/h`;
    document.getElementById("wgt").textContent =
        `Gusts: ${Math.round(c.wind_gusts_10m)} km/h`;
    const sr = new Date(d.sunrise[0]),
        ss = new Date(d.sunset[0]);
    const fmt = (dt) =>
        dt.toLocaleTimeString("en-US", {
            timeZone: tz,
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    document.getElementById("sr").textContent = fmt(sr);
    document.getElementById("ss2").textContent = fmt(ss);
    const ms = ss - sr;
    document.getElementById("dl").textContent =
        `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
    drawArc(sr, ss);
    renderH(h, z);
    renderD(d);
    renderDet(c, d);
    const sev = [95, 96, 99, 82, 86];
    const ab = document.getElementById("alb");
    if (sev.includes(c.weather_code)) {
        ab.classList.add("on");
        document.getElementById("atit").textContent = w.d + " Alert";
        document.getElementById("atxt").textContent =
            `Current conditions show ${w.d.toLowerCase()} in ${city}. Exercise caution and monitor local emergency services.`;
    } else ab.classList.remove("on");
    document.getElementById("welcome").style.display = "none";
    const wc = document.getElementById("wc");
    wc.classList.remove("on");
    void wc.offsetWidth;
    wc.classList.add("on");
}

function drawArc(sr, ss) {
    const now = new Date();
    const p = Math.max(0, Math.min(1, (now - sr) / (ss - sr)));
    const bz = (t, ax, ay, bx, by, cx, cy) => ({
        x: (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * bx + t * t * cx,
        y: (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * by + t * t * cy,
    });
    const pos = bz(p, 10, 82, 100, 8, 190, 82);
    document.getElementById("sd").setAttribute("cx", pos.x.toFixed(1));
    document.getElementById("sd").setAttribute("cy", pos.y.toFixed(1));
    const steps = 20,
        stop = Math.round(p * steps);
    let pd = "M10 82";
    for (let i = 1; i <= stop; i++) {
        const pt = bz(i / steps, 10, 82, 100, 8, 190, 82);
        pd += ` L${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }
    document.getElementById("sp2").setAttribute("d", pd);
}

function renderH(h, z) {
    const row = document.getElementById("hr");
    row.innerHTML = "";
    const now = new Date();
    let si = 0;
    for (let i = 0; i < h.time.length; i++) {
        if (new Date(h.time[i] + ":00") >= now) {
            si = Math.max(0, i - 1);
            break;
        }
    }
    for (let i = si; i < Math.min(si + 24, h.time.length); i++) {
        const t = new Date(h.time[i] + ":00");
        const isN = i === si;
        const w = gw(h.weather_code[i]);
        const pop = h.precipitation_probability[i] ?? 0;
        const hr = t.toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: z,
        });
        const el = document.createElement("div");
        el.className = "hi" + (isN ? " now" : "");
        el.innerHTML = `<div class="htm">${isN ? "Now" : hr}</div><div class="hic">${wIco(w.i, 22)}</div><div class="htp">${dT(h.temperature_2m[i])}°</div>${pop > 0 ? `<div class="hpp">${pop}%</div>` : ""}`;
        row.appendChild(el);
    }
}

function renderD(d) {
    const box = document.getElementById("fr");
    box.innerHTML = "";
    const dn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const mxa = d.temperature_2m_max,
        mna = d.temperature_2m_min;
    const gmax = Math.max(...mxa),
        gmin = Math.min(...mna);
    d.time.forEach((t, i) => {
        const dt = new Date(t + "T12:00:00");
        const name = i === 0 ? "Today" : dn[dt.getDay()];
        const w = gw(d.weather_code[i]);
        const hi = dT(mxa[i]),
            lo = dT(mna[i]);
        const bp = ((mxa[i] - gmin) / (gmax - gmin)) * 100 || 50;
        const pop = d.precipitation_probability_max[i] ?? 0;
        const el = document.createElement("div");
        el.className = "dr";
        el.innerHTML = `<div class="dn">${name}</div><div>${wIco(w.i, 24)}</div><div class="dd">${w.d}</div><div class="dbw"><div class="db" style="width:${bp}%"></div></div><div class="dp">${pop > 0 ? pop + "%" : ""}</div><div class="dts"><span class="tlo">${lo}°</span><span class="thi">${hi}°</span></div>`;
        box.appendChild(el);
    });
}

function renderDet(c, d) {
    const uv = d.uv_index_max[0] ?? 0;
    const uvc =
        uv <= 2
            ? "#22c55e"
            : uv <= 5
                ? "#facc15"
                : uv <= 7
                    ? "#f97316"
                    : uv <= 10
                        ? "#ef4444"
                        : "#7c3aed";
    const uvl =
        uv <= 2
            ? "Low"
            : uv <= 5
                ? "Moderate"
                : uv <= 7
                    ? "High"
                    : uv <= 10
                        ? "Very High"
                        : "Extreme";
    const uvp = Math.min((uv / 12) * 100, 100);
    const dew = c.temperature_2m - (100 - c.relative_humidity_2m) / 5;
    const items = [
        {
            l: "UV Index",
            i: '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>',
            v: `${uv.toFixed(1)} <span style="color:${uvc};font-size:.72rem;font-weight:700">${uvl}</span>`,
            x: `<div class="uvb"><div class="uvd" style="left:${uvp}%"></div></div>`,
        },
        {
            l: "Precipitation",
            i: '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M12 2L5 16h14L12 2z"/><path d="M12 22a3 3 0 0 1-3-3c0-1.66 3-5 3-5s3 3.34 3 5a3 3 0 0 1-3 3z"/></svg>',
            v: `${c.precipitation} mm`,
            x: '<div class="ds">Last hour</div>',
        },
        {
            l: "Dew Point",
            i: '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg>',
            v: `${dT(dew)}°${unit}`,
            x: '<div class="ds">Condensation threshold</div>',
        },
        {
            l: "Max Wind Today",
            i: '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M5 8h8.5a2.5 2.5 0 1 1-2.34 3.4M5 12h12.5a2.5 2.5 0 1 1-2.34 3.4M5 16h5.5a2.5 2.5 0 1 1-2.34 3.4"/></svg>',
            v: `${d.wind_speed_10m_max[0].toFixed(0)} km/h`,
            x: '<div class="ds">Daily maximum</div>',
        },
    ];
    const grid = document.getElementById("dg");
    grid.innerHTML = "";
    items.forEach((it) => {
        const el = document.createElement("div");
        el.className = "dc";
        el.innerHTML = `<div class="dl">${it.i}${it.l}</div><div class="dv">${it.v}</div>${it.x || ""}`;
        grid.appendChild(el);
    });
}

setInterval(() => {
    if (raw) loadG(raw.g);
}, 600000);