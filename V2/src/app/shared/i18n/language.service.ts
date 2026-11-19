import { Injectable, signal } from '@angular/core';

export type Language = 'pt' | 'en' | 'es';

type Translation = Record<Language, string>;

const translations: Record<string, Translation> = {
  'Selecionar idioma': { pt: 'Selecionar idioma', en: 'Select language', es: 'Seleccionar idioma' },
  'Alternar tema': { pt: 'Alternar tema', en: 'Toggle theme', es: 'Cambiar tema' },
  'Navegação principal': { pt: 'Navegação principal', en: 'Main navigation', es: 'Navegación principal' },
  'Alternar navegação': { pt: 'Alternar navegação', en: 'Toggle navigation', es: 'Alternar navegación' },
  'Ativar tema escuro': { pt: 'Ativar tema escuro', en: 'Enable dark theme', es: 'Activar tema oscuro' },
  'Ativar tema claro': { pt: 'Ativar tema claro', en: 'Enable light theme', es: 'Activar tema claro' },
  Sobre: { pt: 'Sobre', en: 'About', es: 'Sobre mí' },
  Experiência: { pt: 'Experiência', en: 'Experience', es: 'Experiencia' },
  Educação: { pt: 'Educação', en: 'Education', es: 'Educación' },
  Habilidades: { pt: 'Habilidades', en: 'Skills', es: 'Habilidades' },
  Cursos: { pt: 'Cursos', en: 'Courses', es: 'Cursos' },
  Recomendações: { pt: 'Recomendações', en: 'Recommendations', es: 'Recomendaciones' },
  Interesses: { pt: 'Interesses', en: 'Interests', es: 'Intereses' },
  HOME: { pt: 'HOME', en: 'HOME', es: 'INICIO' },
  'Destaques da trajetória profissional em finanças e tecnologia': {
    pt: 'Destaques da trajetória profissional em finanças e tecnologia',
    en: 'Highlights of a career in finance and technology',
    es: 'Aspectos destacados de una trayectoria en finanzas y tecnología',
  },
  'Navegação do carrossel': { pt: 'Navegação do carrossel', en: 'Carousel navigation', es: 'Navegación del carrusel' },
  'Destaque anterior': { pt: 'Destaque anterior', en: 'Previous highlight', es: 'Aspecto anterior' },
  'Próximo destaque': { pt: 'Próximo destaque', en: 'Next highlight', es: 'Siguiente aspecto' },
  'Pausar carrossel': { pt: 'Pausar carrossel', en: 'Pause carousel', es: 'Pausar carrusel' },
  'Reproduzir carrossel': { pt: 'Reproduzir carrossel', en: 'Play carousel', es: 'Reproducir carrusel' },
  'Ajustar posição horizontal da foto de perfil': {
    pt: 'Ajustar posição horizontal da foto de perfil',
    en: 'Adjust profile photo horizontal position',
    es: 'Ajustar la posición horizontal de la foto de perfil',
  },
  'Controles da foto de perfil': { pt: 'Controles da foto de perfil', en: 'Profile photo controls', es: 'Controles de la foto de perfil' },
  'Redefinir posição da foto': { pt: 'Redefinir posição da foto', en: 'Reset photo position', es: 'Restablecer posición de la foto' },
  'Foto de perfil de Danilo Vasconcellos': { pt: 'Foto de perfil de Danilo Vasconcellos', en: 'Danilo Vasconcellos profile photo', es: 'Foto de perfil de Danilo Vasconcellos' },
  'Logo da Alura': { pt: 'Logo da Alura', en: 'Alura logo', es: 'Logotipo de Alura' },
  'Logo da Udemy': { pt: 'Logo da Udemy', en: 'Udemy logo', es: 'Logotipo de Udemy' },
  'Logo da Tranning': { pt: 'Logo da Tranning', en: 'Tranning logo', es: 'Logotipo de Tranning' },
  'Logo da FIAP': { pt: 'Logo da FIAP', en: 'FIAP logo', es: 'Logotipo de FIAP' },
  'Logo da FATEC': { pt: 'Logo da FATEC', en: 'FATEC logo', es: 'Logotipo de FATEC' },
  'Logo da UNIP': { pt: 'Logo da UNIP', en: 'UNIP logo', es: 'Logotipo de UNIP' },
  'Logo da ASA': { pt: 'Logo da ASA', en: 'ASA logo', es: 'Logotipo de ASA' },
  'Logo da XP Inc.': { pt: 'Logo da XP Inc.', en: 'XP Inc. logo', es: 'Logotipo de XP Inc.' },
  'Logo do BTG Pactual': { pt: 'Logo do BTG Pactual', en: 'BTG Pactual logo', es: 'Logotipo de BTG Pactual' },
  'Logo da Vidalink': { pt: 'Logo da Vidalink', en: 'Vidalink logo', es: 'Logotipo de Vidalink' },
  'Logo da DXC Technology': { pt: 'Logo da DXC Technology', en: 'DXC Technology logo', es: 'Logotipo de DXC Technology' },
  'Logo da Bemis Company': { pt: 'Logo da Bemis Company', en: 'Bemis Company logo', es: 'Logotipo de Bemis Company' },
  carrossel: { pt: 'carrossel', en: 'carousel', es: 'carrusel' },
  slide: { pt: 'slide', en: 'slide', es: 'diapositiva' },
  'Perfil profissional': { pt: 'Perfil profissional', en: 'Professional profile', es: 'Perfil profesional' },
  'Engenheiro de Software Sênior | C#/.NET | Angular | Microsserviços': {
    pt: 'Engenheiro de Software Sênior | C#/.NET | Angular | Microsserviços',
    en: 'Senior Software Engineer | C#/.NET | Angular | Microservices',
    es: 'Ingeniero de software sénior | C#/.NET | Angular | Microservicios',
  },
  'São Paulo, Brasil · Híbrido': { pt: 'São Paulo, Brasil · Híbrido', en: 'São Paulo, Brazil · Hybrid', es: 'São Paulo, Brasil · Híbrido' },
  'Engenheiro de software com experiência em aplicações financeiras, microsserviços e sistemas de prevenção a crimes e fraudes. Atuação com C#/.NET, Angular, cloud, mensageria, bancos de dados distribuídos e práticas de qualidade, observabilidade e entrega contínua.': {
    pt: 'Engenheiro de software com experiência em aplicações financeiras, microsserviços e sistemas de prevenção a crimes e fraudes. Atuação com C#/.NET, Angular, cloud, mensageria, bancos de dados distribuídos e práticas de qualidade, observabilidade e entrega contínua.',
    en: 'Software engineer experienced in financial applications, microservices, and crime and fraud prevention systems. Works with C#/.NET, Angular, cloud, messaging, distributed databases, and quality, observability, and continuous delivery practices.',
    es: 'Ingeniero de software con experiencia en aplicaciones financieras, microservicios y sistemas de prevención de delitos y fraudes. Trabaja con C#/.NET, Angular, cloud, mensajería, bases de datos distribuidas y prácticas de calidad, observabilidad y entrega continua.',
  },
  'Contatos e redes sociais': { pt: 'Contatos e redes sociais', en: 'Contact and social networks', es: 'Contacto y redes sociales' },
  'Enviar e-mail para Danilo': { pt: 'Enviar e-mail para Danilo', en: 'Email Danilo', es: 'Enviar un correo a Danilo' },
  'Gera o currículo na janela de impressão': { pt: 'Gera o currículo na janela de impressão', en: 'Generate the resume in the print window', es: 'Genera el currículum en la ventana de impresión' },
  'Gerar currículo em PDF': { pt: 'Gerar currículo em PDF', en: 'Generate resume PDF', es: 'Generar currículum en PDF' },
  'Alinhado com o início do texto': { pt: 'Alinhado com o início do texto', en: 'Aligned with the start of the text', es: 'Alineado con el inicio del texto' },
  'Foto a {percent}% da esquerda': { pt: 'Foto a {percent}% da esquerda', en: 'Photo at {percent}% from the left', es: 'Foto a {percent}% desde la izquierda' },
  Destaque: { pt: 'Destaque', en: 'Highlight', es: 'Aspecto destacado' },
  de: { pt: 'de', en: 'of', es: 'de' },
  Atual: { pt: 'Atual', en: 'Current', es: 'Actual' },
  Presencial: { pt: 'Presencial', en: 'On-site', es: 'Presencial' },
  Híbrido: { pt: 'Híbrido', en: 'Hybrid', es: 'Híbrido' },
  'Crédito e empréstimo': { pt: 'Crédito e empréstimo', en: 'Credit and lending', es: 'Crédito y préstamos' },
  'Engenheiro de software sênior': { pt: 'Engenheiro de software sênior', en: 'Senior Software Engineer', es: 'Ingeniero de software sénior' },
  'Engenheiro de software': { pt: 'Engenheiro de software', en: 'Software Engineer', es: 'Ingeniero de software' },
  'Desenvolvedor de Software Pleno': { pt: 'Desenvolvedor de Software Pleno', en: 'Mid-level Software Developer', es: 'Desarrollador de software semisenior' },
  'Desenvolvedor de Software': { pt: 'Desenvolvedor de Software', en: 'Software Developer', es: 'Desarrollador de software' },
  'Analista de suporte a sistemas pleno': { pt: 'Analista de suporte a sistemas pleno', en: 'Mid-level Systems Support Analyst', es: 'Analista de soporte de sistemas semisenior' },
  'Analista de suporte pleno T.I': { pt: 'Analista de suporte pleno T.I', en: 'Mid-level IT Support Analyst', es: 'Analista de soporte de TI semisenior' },
  'Estagiário em infraestrutura de TI': { pt: 'Estagiário em infraestrutura de TI', en: 'IT Infrastructure Intern', es: 'Pasante de infraestructura de TI' },
  'Data de início a informar': { pt: 'Data de início a informar', en: 'Start date to be confirmed', es: 'Fecha de inicio por confirmar' },
  'Setembro 2025 - Período a confirmar': { pt: 'Setembro 2025 - Período a confirmar', en: 'September 2025 - End date to be confirmed', es: 'Septiembre de 2025 - Período por confirmar' },
  'Novembro 2023 - Setembro 2025': { pt: 'Novembro 2023 - Setembro 2025', en: 'November 2023 - September 2025', es: 'Noviembre de 2023 - septiembre de 2025' },
  'Dezembro 2021 - 2023': { pt: 'Dezembro 2021 - 2023', en: 'December 2021 - 2023', es: 'Diciembre de 2021 - 2023' },
  'Janeiro 2020 - Dezembro 2021': { pt: 'Janeiro 2020 - Dezembro 2021', en: 'January 2020 - December 2021', es: 'Enero de 2020 - diciembre de 2021' },
  'Janeiro 2016 - Dezembro 2017': { pt: 'Janeiro 2016 - Dezembro 2017', en: 'January 2016 - December 2017', es: 'Enero de 2016 - diciembre de 2017' },
  'Digital Empresas': { pt: 'Digital Empresas', en: 'Digital Business', es: 'Digital Empresas' },
  'Prevenção a fraudes e crimes financeiros': { pt: 'Prevenção a fraudes e crimes financeiros', en: 'Fraud and financial crime prevention', es: 'Prevención de fraudes y delitos financieros' },
  'Atuei como Engenheiro de Software na XP Inc., em São Paulo, no modelo híbrido.': {
    pt: 'Atuei como Engenheiro de Software na XP Inc., em São Paulo, no modelo híbrido.',
    en: 'Worked as a Software Engineer at XP Inc. in São Paulo in a hybrid role.',
    es: 'Trabajé como ingeniero de software en XP Inc., en São Paulo, en modalidad híbrida.',
  },
  'Atuei em duas squads — Sustentação e FastTrack — mantendo sistemas de prevenção a crimes financeiros e apoiando as áreas de onboarding e transacional. Na FastTrack, entreguei projetos de alta prioridade. Trabalhei com C#, .NET, Angular, Azure, AWS, microsserviços, DynamoDB, Redis, Athena, RabbitMQ, Kafka, Docker e Rancher, além de testes unitários e de carga, CI/CD e monitoramento com Splunk e Datadog.': {
    pt: 'Atuei em duas squads — Sustentação e FastTrack — mantendo sistemas de prevenção a crimes financeiros e apoiando as áreas de onboarding e transacional. Na FastTrack, entreguei projetos de alta prioridade. Trabalhei com C#, .NET, Angular, Azure, AWS, microsserviços, DynamoDB, Redis, Athena, RabbitMQ, Kafka, Docker e Rancher, além de testes unitários e de carga, CI/CD e monitoramento com Splunk e Datadog.',
    en: 'Worked across two squads, Sustentação and FastTrack, maintaining financial crime prevention systems and supporting onboarding and transactional teams. At FastTrack, delivered high-priority projects. Worked with C#, .NET, Angular, Azure, AWS, microservices, DynamoDB, Redis, Athena, RabbitMQ, Kafka, Docker, and Rancher, as well as unit and load testing, CI/CD, and monitoring with Splunk and Datadog.',
    es: 'Trabajé en dos equipos, Sustentação y FastTrack, manteniendo sistemas de prevención de delitos financieros y apoyando las áreas de incorporación y transacciones. En FastTrack, entregué proyectos prioritarios. Trabajé con C#, .NET, Angular, Azure, AWS, microservicios, DynamoDB, Redis, Athena, RabbitMQ, Kafka, Docker y Rancher, además de pruebas unitarias y de carga, CI/CD y monitorización con Splunk y Datadog.',
  },
  'Desenvolvi e mantive soluções em C#, .NET, APIs REST e PL/SQL, realizei troubleshooting de sistemas críticos e análise de logs no GCP, configurei integrações e atuei com bancos Oracle, PostgreSQL e MongoDB. Também administrei incidentes no Jira e colaborei com equipes técnicas e clientes para melhorar a estabilidade das operações.': {
    pt: 'Desenvolvi e mantive soluções em C#, .NET, APIs REST e PL/SQL, realizei troubleshooting de sistemas críticos e análise de logs no GCP, configurei integrações e atuei com bancos Oracle, PostgreSQL e MongoDB. Também administrei incidentes no Jira e colaborei com equipes técnicas e clientes para melhorar a estabilidade das operações.',
    en: 'Developed and maintained solutions with C#, .NET, REST APIs, and PL/SQL; troubleshot critical systems and analyzed logs in GCP; configured integrations; and worked with Oracle, PostgreSQL, and MongoDB databases. Also managed Jira incidents and collaborated with technical teams and clients to improve operational stability.',
    es: 'Desarrollé y mantuve soluciones con C#, .NET, API REST y PL/SQL; resolví problemas en sistemas críticos y analicé registros en GCP; configuré integraciones y trabajé con bases de datos Oracle, PostgreSQL y MongoDB. También gestioné incidentes en Jira y colaboré con equipos técnicos y clientes para mejorar la estabilidad de las operaciones.',
  },
  'Prestei suporte técnico a usuários VIP e ao ambiente fabril de alta prioridade, gerenciando chamados e incidentes com ServiceNow e Remedy. Apliquei práticas ITIL, diagnóstico técnico e problem management para garantir atendimento ágil, tratamento adequado de prioridades e comunicação clara com as áreas envolvidas.': {
    pt: 'Prestei suporte técnico a usuários VIP e ao ambiente fabril de alta prioridade, gerenciando chamados e incidentes com ServiceNow e Remedy. Apliquei práticas ITIL, diagnóstico técnico e problem management para garantir atendimento ágil, tratamento adequado de prioridades e comunicação clara com as áreas envolvidas.',
    en: 'Provided technical support to VIP users and a high-priority manufacturing environment, managing tickets and incidents with ServiceNow and Remedy. Applied ITIL practices, technical diagnostics, and problem management to deliver responsive support, handle priorities appropriately, and communicate clearly with stakeholders.',
    es: 'Brindé soporte técnico a usuarios VIP y a un entorno de fábrica de alta prioridad, gestionando solicitudes e incidentes con ServiceNow y Remedy. Apliqué prácticas ITIL, diagnóstico técnico y gestión de problemas para ofrecer una atención ágil, priorizar adecuadamente y comunicarme con claridad con las áreas involucradas.',
  },
  'Realizei suporte presencial e remoto a desktops, notebooks, smartphones e aplicativos corporativos, além da manutenção de impressoras térmicas Argox/Zebra e de atividades de infraestrutura. Executei instalações, cabeamento estruturado, monitoramento por CFTV, gestão de chamados no Remedy e ServiceNow e suporte aos sistemas Windows e macOS. Documentei procedimentos e controlei patrimônio de TI.': {
    pt: 'Realizei suporte presencial e remoto a desktops, notebooks, smartphones e aplicativos corporativos, além da manutenção de impressoras térmicas Argox/Zebra e de atividades de infraestrutura. Executei instalações, cabeamento estruturado, monitoramento por CFTV, gestão de chamados no Remedy e ServiceNow e suporte aos sistemas Windows e macOS. Documentei procedimentos e controlei patrimônio de TI.',
    en: 'Provided on-site and remote support for desktops, laptops, smartphones, and business applications, maintained Argox/Zebra thermal printers, and handled infrastructure tasks. Performed installations and structured cabling, monitored CCTV, managed Remedy and ServiceNow tickets, and supported Windows and macOS systems. Documented procedures and managed IT assets.',
    es: 'Ofrecí soporte presencial y remoto para computadoras, portátiles, teléfonos inteligentes y aplicaciones corporativas; mantuve impresoras térmicas Argox/Zebra y realicé tareas de infraestructura. Ejecuté instalaciones y cableado estructurado, supervisé CCTV, gestioné solicitudes en Remedy y ServiceNow y brindé soporte a Windows y macOS. Documenté procedimientos y controlé los activos de TI.',
  },
  'Interesses profissionais': { pt: 'Interesses profissionais', en: 'Professional interests', es: 'Intereses profesionales' },
  'Uma visão interativa das tecnologias e práticas que se conectam na minha atuação em software financeiro. Selecione um ponto para explorar.': {
    pt: 'Uma visão interativa das tecnologias e práticas que se conectam na minha atuação em software financeiro. Selecione um ponto para explorar.',
    en: 'An interactive view of the technologies and practices behind my work in financial software. Select a point to explore.',
    es: 'Una vista interactiva de las tecnologías y prácticas relacionadas con mi trabajo en software financiero. Seleccione un punto para explorar.',
  },
  'Mapa interativo de habilidades': { pt: 'Mapa interativo de habilidades', en: 'Interactive skills map', es: 'Mapa interactivo de habilidades' },
  'Engenharia de software': { pt: 'Engenharia de software', en: 'Software engineering', es: 'Ingeniería de software' },
  'Serviços financeiros': { pt: 'Serviços financeiros', en: 'Financial services', es: 'Servicios financieros' },
  'Outras competências e ferramentas': { pt: 'Outras competências e ferramentas', en: 'Additional skills and tools', es: 'Otras competencias y herramientas' },
  'Competências técnicas adicionais': { pt: 'Competências técnicas adicionais', en: 'Additional technical skills', es: 'Competencias técnicas adicionales' },
  'Backend e APIs': { pt: 'Backend e APIs', en: 'Backend and APIs', es: 'Backend y API' },
  'Web e interfaces': { pt: 'Web e interfaces', en: 'Web and interfaces', es: 'Web e interfaces' },
  'Cloud e dados': { pt: 'Cloud e dados', en: 'Cloud and data', es: 'Cloud y datos' },
  'Mensageria e operações': { pt: 'Mensageria e operações', en: 'Messaging and operations', es: 'Mensajería y operaciones' },
  'Desenvolvimento:': { pt: 'Desenvolvimento:', en: 'Development:', es: 'Desarrollo:' },
  'Cloud e dados:': { pt: 'Cloud e dados:', en: 'Cloud and data:', es: 'Cloud y datos:' },
  'Engenharia e operações:': { pt: 'Engenharia e operações:', en: 'Engineering and operations:', es: 'Ingeniería y operaciones:' },
  'Ferramentas:': { pt: 'Ferramentas:', en: 'Tools:', es: 'Herramientas:' },
  'Busco oportunidades em análise de sistemas, desenvolvimento e sustentação de aplicações .NET, APIs REST e integrações. Tenho interesse em atuar na resolução de problemas de produção, melhoria da estabilidade de serviços e colaboração entre equipes de desenvolvimento, suporte e negócio.': {
    pt: 'Busco oportunidades em análise de sistemas, desenvolvimento e sustentação de aplicações .NET, APIs REST e integrações. Tenho interesse em atuar na resolução de problemas de produção, melhoria da estabilidade de serviços e colaboração entre equipes de desenvolvimento, suporte e negócio.',
    en: 'I am seeking opportunities in systems analysis, development, and support of .NET applications, REST APIs, and integrations. I am interested in production troubleshooting, improving service stability, and collaborating across development, support, and business teams.',
    es: 'Busco oportunidades en análisis de sistemas, desarrollo y soporte de aplicaciones .NET, API REST e integraciones. Me interesa resolver problemas en producción, mejorar la estabilidad de los servicios y colaborar con equipos de desarrollo, soporte y negocio.',
  },
  'Também me interesso por arquitetura de software, cloud (Azure e Google Cloud), bancos de dados, segurança da informação e práticas ITIL. Valorizo ambientes colaborativos, aprendizado contínuo e soluções que melhorem a experiência de usuários e clientes.': {
    pt: 'Também me interesso por arquitetura de software, cloud (Azure e Google Cloud), bancos de dados, segurança da informação e práticas ITIL. Valorizo ambientes colaborativos, aprendizado contínuo e soluções que melhorem a experiência de usuários e clientes.',
    en: 'I am also interested in software architecture, cloud (Azure and Google Cloud), databases, information security, and ITIL practices. I value collaborative environments, continuous learning, and solutions that improve the experience of users and customers.',
    es: 'También me interesan la arquitectura de software, cloud (Azure y Google Cloud), las bases de datos, la seguridad de la información y las prácticas ITIL. Valoro los entornos colaborativos, el aprendizaje continuo y las soluciones que mejoran la experiencia de usuarios y clientes.',
  },
  'Confira outras recomendações': { pt: 'Confira outras recomendações', en: 'See more recommendations', es: 'Consulte otras recomendaciones' },
  'diretamente no LinkedIn': { pt: 'diretamente no LinkedIn', en: 'directly on LinkedIn', es: 'directamente en LinkedIn' },
  'Recomendação recebida no LinkedIn': { pt: 'Recomendação recebida no LinkedIn', en: 'Recommendation received on LinkedIn', es: 'Recomendación recibida en LinkedIn' },
  'Resumo:': { pt: 'Resumo:', en: 'Summary:', es: 'Resumen:' },
  'Descrição da experiência será adicionada.': { pt: 'Descrição da experiência será adicionada.', en: 'Experience description to be added.', es: 'Descripción de la experiencia pendiente de añadir.' },
  'Colega de trabalho no BTG Pactual': { pt: 'Colega de trabalho no BTG Pactual', en: 'Colleague at BTG Pactual', es: 'Compañero de trabajo en BTG Pactual' },
  'Desenvolvedora Backend — Paraná Banco S/A': { pt: 'Desenvolvedora Backend — Paraná Banco S/A', en: 'Backend Developer — Paraná Banco S/A', es: 'Desarrolladora backend — Paraná Banco S/A' },
  'Líder técnico de suporte · Supervisor direto': { pt: 'Líder técnico de suporte · Supervisor direto', en: 'Technical Support Lead · Direct Supervisor', es: 'Líder técnico de soporte · Supervisor directo' },
  'Coordenadora de operações · Supervisora direta': { pt: 'Coordenadora de operações · Supervisora direta', en: 'Operations Coordinator · Direct Supervisor', es: 'Coordinadora de operaciones · Supervisora directa' },
  'CEO da Gestein Digital · Colega de equipe': { pt: 'CEO da Gestein Digital · Colega de equipe', en: 'CEO of Gestein Digital · Teammate', es: 'CEO de Gestein Digital · Compañero de equipo' },
  'LinkedIn · 31 de janeiro de 2023': { pt: 'LinkedIn · 31 de janeiro de 2023', en: 'LinkedIn · January 31, 2023', es: 'LinkedIn · 31 de enero de 2023' },
  'LinkedIn · 24 de janeiro de 2023': { pt: 'LinkedIn · 24 de janeiro de 2023', en: 'LinkedIn · January 24, 2023', es: 'LinkedIn · 24 de enero de 2023' },
  'LinkedIn · 22 de janeiro de 2021': { pt: 'LinkedIn · 22 de janeiro de 2021', en: 'LinkedIn · January 22, 2021', es: 'LinkedIn · 22 de enero de 2021' },
  'Ressalta a experiência de Danilo em suporte técnico, sua responsabilidade e postura analítica e cordial, além da agilidade para resolver incidentes.': {
    pt: 'Ressalta a experiência de Danilo em suporte técnico, sua responsabilidade e postura analítica e cordial, além da agilidade para resolver incidentes.',
    en: 'Highlights Danilo’s technical support experience, responsibility, thoughtful and courteous approach, and ability to resolve incidents quickly.',
    es: 'Destaca la experiencia de Danilo en soporte técnico, su responsabilidad y actitud analítica y cordial, además de su rapidez para resolver incidentes.',
  },
  'Ressalta a experiência de Danilo em suporte técnico, sua responsabilidade e postura analítica e cordial, além da agilidade para resolver incidentes de diferentes níveis. Também reconhece sua disponibilidade para apoiar colegas, a eficiência nos atendimentos e a iniciativa para aprimorar processos e resultados da equipe.': {
    pt: 'Ressalta a experiência de Danilo em suporte técnico, sua responsabilidade e postura analítica e cordial, além da agilidade para resolver incidentes de diferentes níveis. Também reconhece sua disponibilidade para apoiar colegas, a eficiência nos atendimentos e a iniciativa para aprimorar processos e resultados da equipe.',
    en: 'Highlights Danilo’s technical support experience, responsibility, thoughtful and courteous approach, and ability to resolve incidents of varying severity. Also recognizes his willingness to support colleagues, efficient service, and initiative in improving team processes and outcomes.',
    es: 'Destaca la experiencia de Danilo en soporte técnico, su responsabilidad y actitud analítica y cordial, además de su rapidez para resolver incidentes de distintos niveles. También reconoce su disposición para apoyar a sus compañeros, la eficiencia de su atención y su iniciativa para mejorar los procesos y resultados del equipo.',
  },
  'Ressalta a dedicação e proatividade de Danilo, sua contribuição com melhorias para o time e a abertura a feedback e desenvolvimento contínuo.': {
    pt: 'Ressalta a dedicação e proatividade de Danilo, sua contribuição com melhorias para o time e a abertura a feedback e desenvolvimento contínuo.',
    en: 'Highlights Danilo’s dedication and initiative, his contributions to team improvements, and his openness to feedback and continuous development.',
    es: 'Destaca la dedicación y proactividad de Danilo, su aporte a las mejoras del equipo y su apertura a la retroalimentación y al desarrollo continuo.',
  },
  'Enfatiza o comprometimento de Danilo com o atendimento aos clientes e sua iniciativa para melhorar continuamente os ambientes em que atua.': {
    pt: 'Enfatiza o comprometimento de Danilo com o atendimento aos clientes e sua iniciativa para melhorar continuamente os ambientes em que atua.',
    en: 'Emphasizes Danilo’s commitment to customer service and his initiative to continuously improve the environments where he works.',
    es: 'Enfatiza el compromiso de Danilo con la atención al cliente y su iniciativa para mejorar continuamente los entornos en los que trabaja.',
  },
  'C# Parte 5: Bibliotecas DLLs, documentação e usando o NuGet': { pt: 'C# Parte 5: Bibliotecas DLLs, documentação e usando o NuGet', en: 'C# Part 5: DLL Libraries, Documentation, and Using NuGet', es: 'C# Parte 5: Bibliotecas DLL, documentación y uso de NuGet' },
  'C# Parte 4: Entendendo exceções': { pt: 'C# Parte 4: Entendendo exceções', en: 'C# Part 4: Understanding Exceptions', es: 'C# Parte 4: Comprender las excepciones' },
  'C# Parte 3: Entendendo herança e interface': { pt: 'C# Parte 3: Entendendo herança e interface', en: 'C# Part 3: Understanding Inheritance and Interfaces', es: 'C# Parte 3: Comprender la herencia y las interfaces' },
  'C# Parte 2: Entendendo a orientação a objetos': { pt: 'C# Parte 2: Entendendo a orientação a objetos', en: 'C# Part 2: Understanding Object-Oriented Programming', es: 'C# Parte 2: Comprender la programación orientada a objetos' },
  'C# Parte 1: Primeiros passos': { pt: 'C# Parte 1: Primeiros passos', en: 'C# Part 1: Getting Started', es: 'C# Parte 1: Primeros pasos' },
  'Testes em .NET: Testando software': { pt: 'Testes em .NET: Testando software', en: '.NET Testing: Software Testing', es: 'Pruebas en .NET: Pruebas de software' },
  'C#: Dominando orientação a objetos': { pt: 'C#: Dominando orientação a objetos', en: 'C#: Mastering Object-Oriented Programming', es: 'C#: Dominar la programación orientada a objetos' },
  'C#: Usando herança e implementando interfaces': { pt: 'C#: Usando herança e implementando interfaces', en: 'C#: Using Inheritance and Implementing Interfaces', es: 'C#: Uso de herencia e implementación de interfaces' },
  'C#: Consumindo API, gravando arquivos e utilizando o LINQ': { pt: 'C#: Consumindo API, gravando arquivos e utilizando o LINQ', en: 'C#: Consuming APIs, Writing Files, and Using LINQ', es: 'C#: Consumo de API, escritura de archivos y uso de LINQ' },
  'SOLID com C#: Princípios da programação orientada a objetos': { pt: 'SOLID com C#: Princípios da programação orientada a objetos', en: 'SOLID with C#: Object-Oriented Programming Principles', es: 'SOLID con C#: Principios de programación orientada a objetos' },
  '.NET 6: Criando uma Web API': { pt: '.NET 6: Criando uma Web API', en: '.NET 6: Building a Web API', es: '.NET 6: Crear una API web' },
  'Produtividade Parte 1: Estratégias para o dia a dia': { pt: 'Produtividade Parte 1: Estratégias para o dia a dia', en: 'Productivity Part 1: Everyday Strategies', es: 'Productividad Parte 1: Estrategias para el día a día' },
  'Git e GitHub: Controle e compartilhe seu código': { pt: 'Git e GitHub: Controle e compartilhe seu código', en: 'Git and GitHub: Version and Share Your Code', es: 'Git y GitHub: Controla y comparte tu código' },
  'C# Explorando a linguagem': { pt: 'C# Explorando a linguagem', en: 'C#: Exploring the Language', es: 'C#: Explorar el lenguaje' },
  'C# Orientação a Objetos': { pt: 'C# Orientação a Objetos', en: 'C#: Object-Oriented Programming', es: 'C#: Programación orientada a objetos' },
  'C# Programação Orientada a Objetos': { pt: 'C# Programação Orientada a Objetos', en: 'C#: Object-Oriented Programming', es: 'C#: Programación orientada a objetos' },
  'Lógica de Programação': { pt: 'Lógica de Programação', en: 'Programming Logic', es: 'Lógica de programación' },
  'Oracle Developer SQL e PL/SQL': { pt: 'Oracle Developer SQL e PL/SQL', en: 'Oracle Developer: SQL and PL/SQL', es: 'Oracle Developer: SQL y PL/SQL' },
  'Dominando Banco de Dados MySQL e MariaDB': { pt: 'Dominando Banco de Dados MySQL e MariaDB', en: 'Mastering MySQL and MariaDB Databases', es: 'Dominio de bases de datos MySQL y MariaDB' },
  'Tive o prazer de trabalhar com o Danilo no BTG Pactual, atuando juntos nas squads de Sustentação e FastTrack, em projetos de prevenção a crimes financeiros.': {
    pt: 'Tive o prazer de trabalhar com o Danilo no BTG Pactual, atuando juntos nas squads de Sustentação e FastTrack, em projetos de prevenção a crimes financeiros.',
    en: 'I had the pleasure of working with Danilo at BTG Pactual. We worked together in the Sustentação and FastTrack squads on financial crime prevention projects.',
    es: 'Tuve el placer de trabajar con Danilo en BTG Pactual. Colaboramos en los equipos Sustentação y FastTrack en proyectos de prevención de delitos financieros.',
  },
  'Tecnicamente, ele demonstrou domínio sólido em C#/.NET, microsserviços, mensageria (Kafka, RabbitMQ) e bancos de dados como DynamoDB e Redis — sempre com atenção à estabilidade dos sistemas e agilidade na resposta a incidentes.': {
    pt: 'Tecnicamente, ele demonstrou domínio sólido em C#/.NET, microsserviços, mensageria (Kafka, RabbitMQ) e bancos de dados como DynamoDB e Redis — sempre com atenção à estabilidade dos sistemas e agilidade na resposta a incidentes.',
    en: 'Technically, he demonstrated strong command of C#/.NET, microservices, messaging (Kafka, RabbitMQ), and databases such as DynamoDB and Redis, always focusing on system stability and responding quickly to incidents.',
    es: 'En lo técnico, demostró un sólido dominio de C#/.NET, microservicios, mensajería (Kafka, RabbitMQ) y bases de datos como DynamoDB y Redis, siempre atento a la estabilidad de los sistemas y a responder con rapidez ante incidentes.',
  },
  'O que mais me marcou foi seu ownership: não esperava os problemas chegarem — ia atrás, entendia o contexto e entregava com qualidade, mesmo sob pressão e com foco no impacto para o cliente. Em equipe, foi sempre um parceiro confiável, colaborativo e que elevava o nível das discussões técnicas.': {
    pt: 'O que mais me marcou foi seu ownership: não esperava os problemas chegarem — ia atrás, entendia o contexto e entregava com qualidade, mesmo sob pressão e com foco no impacto para o cliente. Em equipe, foi sempre um parceiro confiável, colaborativo e que elevava o nível das discussões técnicas.',
    en: 'What stood out most was his ownership: he did not wait for problems to arise; he sought them out, understood the context, and delivered quality work under pressure, focused on customer impact. He was always a reliable, collaborative teammate who raised the level of technical discussions.',
    es: 'Lo que más me llamó la atención fue su sentido de responsabilidad: no esperaba a que surgieran los problemas, iba a buscarlos, entendía el contexto y entregaba con calidad, incluso bajo presión y pensando en el impacto para el cliente. En el equipo, siempre fue un compañero confiable y colaborador que elevaba el nivel de las conversaciones técnicas.',
  },
  'Recomendo o Danilo para qualquer time que exija excelência técnica e maturidade em ambientes de alta complexidade.': {
    pt: 'Recomendo o Danilo para qualquer time que exija excelência técnica e maturidade em ambientes de alta complexidade.',
    en: 'I recommend Danilo to any team that demands technical excellence and maturity in highly complex environments.',
    es: 'Recomiendo a Danilo para cualquier equipo que exija excelencia técnica y madurez en entornos de alta complejidad.',
  },
  'Foi um prazer inarrável trabalhar ao lado do Danilo. Além das habilidades técnicas que ele possui, ele é um comunicador claro e eficaz, capaz de explicar conceitos complexos em termos simples para que todos possam entender, o que é uma habilidade muito valiosa em um ambiente de TI.': {
    pt: 'Foi um prazer inarrável trabalhar ao lado do Danilo. Além das habilidades técnicas que ele possui, ele é um comunicador claro e eficaz, capaz de explicar conceitos complexos em termos simples para que todos possam entender, o que é uma habilidade muito valiosa em um ambiente de TI.',
    en: 'It was an exceptional pleasure to work alongside Danilo. In addition to his technical skills, he is a clear and effective communicator who can explain complex concepts in simple terms, a valuable ability in an IT environment.',
    es: 'Fue un placer extraordinario trabajar con Danilo. Además de sus habilidades técnicas, es un comunicador claro y eficaz, capaz de explicar conceptos complejos con sencillez para que todos puedan entenderlos, una cualidad muy valiosa en un entorno de TI.',
  },
  'Foi um prazer inarrável trabalhar ao lado do Danilo. Além das habilidades técnicas, ele é um comunicador claro e eficaz, capaz de explicar conceitos complexos de forma simples.': {
    pt: 'Foi um prazer inarrável trabalhar ao lado do Danilo. Além das habilidades técnicas, ele é um comunicador claro e eficaz, capaz de explicar conceitos complexos de forma simples.',
    en: 'It was an exceptional pleasure to work alongside Danilo. Beyond his technical skills, he is a clear and effective communicator who can explain complex concepts simply.',
    es: 'Fue un placer extraordinario trabajar con Danilo. Además de sus habilidades técnicas, es un comunicador claro y eficaz que puede explicar conceptos complejos con sencillez.',
  },
  'Outra qualidade que eu admiro muito em sua forma de trabalho é sua capacidade de trabalhar bem em equipe. Ele sempre se esforça para ajudar os membros da equipe a alcançar seus objetivos e está sempre disposto a assumir responsabilidades adicionais para garantir que o projeto seja concluído no prazo.': {
    pt: 'Outra qualidade que eu admiro muito em sua forma de trabalho é sua capacidade de trabalhar bem em equipe. Ele sempre se esforça para ajudar os membros da equipe a alcançar seus objetivos e está sempre disposto a assumir responsabilidades adicionais para garantir que o projeto seja concluído no prazo.',
    en: 'Another quality I greatly admire is his ability to work well in a team. He consistently helps teammates reach their goals and is always willing to take on additional responsibilities to ensure projects are completed on time.',
    es: 'Otra cualidad que admiro mucho es su capacidad para trabajar en equipo. Siempre se esfuerza por ayudar a sus compañeros a alcanzar sus objetivos y está dispuesto a asumir responsabilidades adicionales para que los proyectos se completen a tiempo.',
  },
  'Além disso, é altamente confiável e dedicado. Ele se preocupa com o trabalho que faz e está sempre disposto a colocar o tempo e esforço necessário para garantir que cada tarefa seja concluída com sucesso.': {
    pt: 'Além disso, é altamente confiável e dedicado. Ele se preocupa com o trabalho que faz e está sempre disposto a colocar o tempo e esforço necessário para garantir que cada tarefa seja concluída com sucesso.',
    en: 'He is also highly dependable and dedicated. He cares about his work and is always willing to put in the time and effort needed to ensure every task is completed successfully.',
    es: 'Además, es muy confiable y dedicado. Se preocupa por su trabajo y siempre está dispuesto a dedicar el tiempo y el esfuerzo necesarios para que cada tarea se complete con éxito.',
  },
  Habilidade: { pt: 'Habilidade', en: 'Skill', es: 'Habilidad' },
  'Backend de serviços, APIs e microsserviços.': { pt: 'Backend de serviços, APIs e microsserviços.', en: 'Backend services, APIs, and microservices.', es: 'Backend de servicios, API y microservicios.' },
  'Integração e comunicação entre aplicações.': { pt: 'Integração e comunicação entre aplicações.', en: 'Integration and communication between applications.', es: 'Integración y comunicación entre aplicaciones.' },
  'Arquitetura distribuída aplicada a sistemas financeiros.': { pt: 'Arquitetura distribuída aplicada a sistemas financeiros.', en: 'Distributed architecture for financial systems.', es: 'Arquitectura distribuida aplicada a sistemas financieros.' },
  'Desenvolvimento de aplicações web.': { pt: 'Desenvolvimento de aplicações web.', en: 'Web application development.', es: 'Desarrollo de aplicaciones web.' },
  'Linguagem para aplicações e interações web.': { pt: 'Linguagem para aplicações e interações web.', en: 'Language for web applications and interactions.', es: 'Lenguaje para aplicaciones e interacciones web.' },
  'Estrutura semântica de interfaces web.': { pt: 'Estrutura semântica de interfaces web.', en: 'Semantic structure for web interfaces.', es: 'Estructura semántica de interfaces web.' },
  'Estilização e responsividade de interfaces.': { pt: 'Estilização e responsividade de interfaces.', en: 'Interface styling and responsiveness.', es: 'Estilos y adaptación de interfaces.' },
  'Plataforma cloud usada em soluções e serviços.': { pt: 'Plataforma cloud usada em soluções e serviços.', en: 'Cloud platform used for solutions and services.', es: 'Plataforma cloud utilizada en soluciones y servicios.' },
  'Serviços de nuvem, incluindo EC2 e RDS.': { pt: 'Serviços de nuvem, incluindo EC2 e RDS.', en: 'Cloud services, including EC2 and RDS.', es: 'Servicios cloud, incluidos EC2 y RDS.' },
  'Banco NoSQL para aplicações distribuídas.': { pt: 'Banco NoSQL para aplicações distribuídas.', en: 'NoSQL database for distributed applications.', es: 'Base de datos NoSQL para aplicaciones distribuidas.' },
  'Armazenamento de dados em memória.': { pt: 'Armazenamento de dados em memória.', en: 'In-memory data storage.', es: 'Almacenamiento de datos en memoria.' },
  'Athena, SQL/PL/SQL, Oracle, PostgreSQL, MongoDB e GCP.': { pt: 'Athena, SQL/PL/SQL, Oracle, PostgreSQL, MongoDB e GCP.', en: 'Athena, SQL/PL/SQL, Oracle, PostgreSQL, MongoDB, and GCP.', es: 'Athena, SQL/PL/SQL, Oracle, PostgreSQL, MongoDB y GCP.' },
  'Mensageria e processamento de eventos.': { pt: 'Mensageria e processamento de eventos.', en: 'Messaging and event processing.', es: 'Mensajería y procesamiento de eventos.' },
  'Mensageria e integração entre serviços.': { pt: 'Mensageria e integração entre serviços.', en: 'Messaging and service integration.', es: 'Mensajería e integración entre servicios.' },
  'Containers e orquestração de aplicações.': { pt: 'Containers e orquestração de aplicações.', en: 'Containers and application orchestration.', es: 'Contenedores y orquestación de aplicaciones.' },
  'Monitoramento e análise de logs.': { pt: 'Monitoramento e análise de logs.', en: 'Monitoring and log analysis.', es: 'Monitorización y análisis de registros.' },
  'Observabilidade e monitoramento de aplicações.': { pt: 'Observabilidade e monitoramento de aplicações.', en: 'Application observability and monitoring.', es: 'Observabilidad y monitorización de aplicaciones.' },
  'Superior Tecnológico': { pt: 'Superior Tecnológico', en: 'Technology degree', es: 'Tecnólogo' },
  Bacharelado: { pt: 'Bacharelado', en: "Bachelor's degree", es: 'Licenciatura' },
  'Abril 2023 - Abril 2024': { pt: 'Abril 2023 - Abril 2024', en: 'April 2023 - April 2024', es: 'Abril de 2023 - abril de 2024' },
  'Janeiro 2018 - Janeiro 2021': { pt: 'Janeiro 2018 - Janeiro 2021', en: 'January 2018 - January 2021', es: 'Enero de 2018 - enero de 2021' },
  'Janeiro 2014 - Dezembro 2018': { pt: 'Janeiro 2014 - Dezembro 2018', en: 'January 2014 - December 2018', es: 'Enero de 2014 - diciembre de 2018' },
  'Pós-graduação voltada à arquitetura de soluções, modernização de sistemas, computação em nuvem e estratégia tecnológica. Especialização em arquitetura de sistemas .NET na Microsoft Azure, com foco em escalabilidade, disponibilidade, segurança e transformação digital.': {
    pt: 'Pós-graduação voltada à arquitetura de soluções, modernização de sistemas, computação em nuvem e estratégia tecnológica. Especialização em arquitetura de sistemas .NET na Microsoft Azure, com foco em escalabilidade, disponibilidade, segurança e transformação digital.',
    en: 'Postgraduate program focused on solution architecture, systems modernization, cloud computing, and technology strategy. Specialized in .NET systems architecture on Microsoft Azure, with an emphasis on scalability, availability, security, and digital transformation.',
    es: 'Posgrado centrado en arquitectura de soluciones, modernización de sistemas, computación en la nube y estrategia tecnológica. Especialización en arquitectura de sistemas .NET en Microsoft Azure, con énfasis en escalabilidad, disponibilidad, seguridad y transformación digital.',
  },
  'Formação superior em tecnologia voltada à Segurança da Informação, proteção de dados, gestão de riscos, infraestrutura de TI, governança, controles de segurança e mitigação de vulnerabilidades em ambientes corporativos.': {
    pt: 'Formação superior em tecnologia voltada à Segurança da Informação, proteção de dados, gestão de riscos, infraestrutura de TI, governança, controles de segurança e mitigação de vulnerabilidades em ambientes corporativos.',
    en: 'Technology degree focused on information security, data protection, risk management, IT infrastructure, governance, security controls, and vulnerability mitigation in corporate environments.',
    es: 'Carrera tecnológica centrada en seguridad de la información, protección de datos, gestión de riesgos, infraestructura de TI, gobernanza, controles de seguridad y mitigación de vulnerabilidades en entornos corporativos.',
  },
  'Bacharelado em Ciência da Computação com base sólida em desenvolvimento de software, lógica de programação, banco de dados, redes, sistemas operacionais, infraestrutura de TI e resolução de problemas técnicos em ambientes corporativos.': {
    pt: 'Bacharelado em Ciência da Computação com base sólida em desenvolvimento de software, lógica de programação, banco de dados, redes, sistemas operacionais, infraestrutura de TI e resolução de problemas técnicos em ambientes corporativos.',
    en: "Computer Science degree with a strong foundation in software development, programming logic, databases, networking, operating systems, IT infrastructure, and technical problem-solving in corporate environments.",
    es: 'Licenciatura en Ciencias de la Computación con una base sólida en desarrollo de software, lógica de programación, bases de datos, redes, sistemas operativos, infraestructura de TI y resolución de problemas técnicos en entornos corporativos.',
  },
  'ENGENHARIA QUE ': { pt: 'ENGENHARIA QUE ', en: 'ENGINEERING THAT ', es: 'INGENIERÍA QUE ' },
  MOVE: { pt: 'MOVE', en: 'POWERS', es: 'IMPULSA' },
  ' SISTEMAS CRÍTICOS.': { pt: ' SISTEMAS CRÍTICOS.', en: ' CRITICAL SYSTEMS.', es: ' SISTEMAS CRÍTICOS.' },
  'Engenharia de software para plataformas financeiras e operações críticas.': {
    pt: 'Engenharia de software para plataformas financeiras e operações críticas.',
    en: 'Software engineering for financial platforms and mission-critical operations.',
    es: 'Ingeniería de software para plataformas financieras y operaciones críticas.',
  },
  'TECNOLOGIA FINANCEIRA. FEITA PARA ': {
    pt: 'TECNOLOGIA FINANCEIRA. FEITA PARA ',
    en: 'FINANCIAL TECHNOLOGY. BUILT TO ',
    es: 'TECNOLOGÍA FINANCIERA. HECHA PARA ',
  },
  CONFIAR: { pt: 'CONFIAR', en: 'BE TRUSTED', es: 'CONFIAR' },
  '.': { pt: '.', en: '.', es: '.' },
  'C#/.NET, Angular e microsserviços com foco em qualidade e segurança.': {
    pt: 'C#/.NET, Angular e microsserviços com foco em qualidade e segurança.',
    en: 'C#/.NET, Angular, and microservices focused on quality and security.',
    es: 'C#/.NET, Angular y microservicios centrados en la calidad y la seguridad.',
  },
  'SOFTWARE QUE ': { pt: 'SOFTWARE QUE ', en: 'SOFTWARE THAT ', es: 'SOFTWARE QUE ' },
  PROTEGE: { pt: 'PROTEGE', en: 'PROTECTS', es: 'PROTEGE' },
  ' E ESCALA.': { pt: ' E ESCALA.', en: ' AND SCALES.', es: ' Y ESCALA.' },
  'Prevenção a fraudes, sistemas distribuídos e entrega contínua.': {
    pt: 'Prevenção a fraudes, sistemas distribuídos e entrega contínua.',
    en: 'Fraud prevention, distributed systems, and continuous delivery.',
    es: 'Prevención del fraude, sistemas distribuidos y entrega continua.',
  },
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<Language>(this.loadLanguage());

  constructor() {
    this.applyDocumentLanguage(this.language());
  }

  setLanguage(language: Language): void {
    this.language.set(language);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('portfolio-language', language);
    }
    this.applyDocumentLanguage(language);
  }

  translate(text: string): string {
    return translations[text]?.[this.language()] ?? text;
  }

  private loadLanguage(): Language {
    if (typeof window === 'undefined') return 'pt';
    const savedLanguage = window.localStorage.getItem('portfolio-language');
    return savedLanguage === 'en' || savedLanguage === 'es' ? savedLanguage : 'pt';
  }

  private applyDocumentLanguage(language: Language): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
    }
  }
}
