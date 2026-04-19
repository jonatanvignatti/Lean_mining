const presentationContent = [
    {
        id: "title",
        title: "Optimización del Tiempo en Operaciones Mineras",
        subtitle: "Maximizando la Eficiencia mediante Lean Six Sigma",
        content: "Propuesta de Capacitación Integral para Trabajadores y Supervisores",
        background: "industrial-mining"
    },
    {
        id: "challenge",
        title: "¿Por qué Gestión del Tiempo en Minería?",
        content: "En minería, cada minuto cuenta. El costo de la inactividad es crítico y los riesgos operativos aumentan con la desorganización.",
        points: [
            "Altos costos fijos de maquinaria.",
            "Ventanas limitadas para mantenimiento y voladuras.",
            "Complejidad en los relevos de turno.",
            "Impacto directo en la meta de producción diaria."
        ]
    },
    {
        id: "methodology",
        title: "Nuestra Metodología: DMAIC",
        content: "Un enfoque estructurado para la resolución de problemas y la mejora de procesos.",
        points: [
            "**D**efinir los cuellos de botella.",
            "**M**edir tiempos actuales (Línea base).",
            "**A**nalizar causas raíz de demoras.",
            "**I**mplementar mejoras (Mejora del flujo).",
            "**C**ontrolar para que las ganancias sean permanentes."
        ]
    },
    {
        id: "muda",
        title: "Los 8 Desperdicios (Muda) en la Mina",
        content: "Identificar y eliminar lo que no agrega valor al mineral.",
        points: [
            "**Esperas:** Camiones esperando en la pala o chancadora.",
            "**Transporte:** Movimientos innecesarios de materiales o equipos.",
            "**Sobre-procesamiento:** Tareas de mantenimiento redundantes.",
            "**Talento no utilizado:** No escuchar ideas de mejora del operador."
        ]
    },
    {
        id: "tool1-5s",
        title: "Herramienta 1: 5S en el Taller y Sitio",
        content: "Organización que salva vidas y minutos.",
        points: [
            "**Seiri (Clasificar):** Solo lo necesario en la cabina/taller.",
            "**Seiton (Ordenar):** Herramientas al alcance inmediato.",
            "**Seiso (Limpiar):** Facilita detección de fugas o fallas.",
            "**Seiketsu (Estandarizar):** Todos siguen el mismo orden.",
            "**Shitsuke (Disciplina):** Hábito de mantener la eficiencia."
        ]
    },
    {
        id: "tool2-smed",
        title: "Herramienta 2: Cambio Rápido (SMED)",
        content: "Reducción de tiempos muertos en relevos de turno y mantenimiento.",
        points: [
            "Optimización de la 'Charla de Inicio de Turno'.",
            "Preparación de herramientas ANTES de que el equipo pare.",
            "Estandarización de cambios de neumáticos o desgaste.",
            "Transformar tareas 'internas' en 'externas'."
        ]
    },
    {
        id: "visual",
        title: "Herramienta 3: Gestión Visual",
        content: "Saber si vamos ganando o perdiendo el día al primer vistazo.",
        points: [
            "Tableros de Takt Time en tiempo real.",
            "Semáforos de estado de equipos.",
            "Dashboards de KPIs de productividad horaria."
        ]
    },
    {
        id: "program",
        title: "El Programa de Capacitación",
        content: "Un entrenamiento práctico en el campo de trabajo ('Gemba').",
        points: [
            "Fase 1: Diagnóstico participativo con los trabajadores.",
            "Fase 2: Talleres teóricos-prácticos de Lean.",
            "Fase 3: Evento Kaizen (Semana de mejora intensiva).",
            "Fase 4: Acompañamiento en el cambio de hábitos."
        ]
    },
    {
        id: "benefits",
        title: "Beneficios Esperados",
        content: "Resultados tangibles para la empresa y mayor bienestar para el trabajador.",
        points: [
            "Reducción del 15-20% en tiempos muertos operativos.",
            "Aumento de la disponibilidad de flota.",
            "Mejora en la seguridad (trabajo ordenado = trabajo seguro).",
            "Reducción del estrés por 'apagado de incendios' constante."
        ]
    },
    {
        id: "cta",
        title: "Próximos Pasos",
        subtitle: "¿Listos para transformar el tiempo en mineral?",
        content: "Iniciemos con un diagnóstico de 2 días en su operación para identificar el potencial de mejora.",
        contact: "Contacto: [Tu Nombre/Agencia]"
    }
];

let currentSlideIndex = 0;

function createSlide(slideData, index) {
    const slide = document.createElement('div');
    slide.className = `slide ${index === 0 ? 'active' : ''}`;
    slide.id = `slide-${index}`;

    let pointsHtml = '';
    if (slideData.points) {
        pointsHtml = `<ul class="points-list">
            ${slideData.points.map(p => `<li>${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('')}
        </ul>`;
    }

    slide.innerHTML = `
        <div class="slide-content">
            ${slideData.subtitle ? `<h2 class="animate-up">${slideData.subtitle}</h2>` : ''}
            <h1 class="animate-up">${slideData.title}</h1>
            <p class="animate-up">${slideData.content}</p>
            ${pointsHtml}
            ${slideData.contact ? `<div class="contact-info animate-up">${slideData.contact}</div>` : ''}
        </div>
    `;

    return slide;
}

function updateProgressBar() {
    const progress = ((currentSlideIndex + 1) / presentationContent.length) * 100;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) progressBar.style.width = `${progress}%`;
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    slides.forEach(s => s.classList.remove('active'));
    
    currentSlideIndex = index;
    if (currentSlideIndex < 0) currentSlideIndex = presentationContent.length - 1;
    if (currentSlideIndex >= presentationContent.length) currentSlideIndex = 0;

    const targetSlide = document.querySelector(`#slide-${currentSlideIndex}`);
    if (targetSlide) targetSlide.classList.add('active');
    updateProgressBar();
}

function init() {
    const container = document.querySelector('.presentation-container');
    if (!container) return;

    container.innerHTML = ''; // Clear container
    presentationContent.forEach((data, index) => {
        container.appendChild(createSlide(data, index));
    });

    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (nextBtn) nextBtn.onclick = () => showSlide(currentSlideIndex + 1);
    if (prevBtn) prevBtn.onclick = () => showSlide(currentSlideIndex - 1);

    window.onkeydown = (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') showSlide(currentSlideIndex + 1);
        if (e.key === 'ArrowLeft') showSlide(currentSlideIndex - 1);
    };

    updateProgressBar();
}

// Initial load
window.onload = init;
