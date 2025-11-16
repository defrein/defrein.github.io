export const resumeData = {
	personal: {
		name: "Wahni Adnani",
		title: "AI Engineer | Software Engineer",
		phone: "+6289636327090",
		email: "adnaniwahni@gmail.com",
		linkedin: "linkedin.com/in/wahni-adnani",
		github: "github.com/defrein",
		location: "Banjarmasin, Indonesia",
		summary: "Software Engineer with 5+ years building full-stack applications and AI-driven systems. Specialized in ML, NLP, computer vision, and robotics. Proven track record designing intelligent solutions across web development, automation systems, and AI model implementation.",
		availability: "Currently available for opportunities"
	},
	
	experience: [
		{
			title: "AI Engineer",
			company: "Open Journal Theme (JATSeditor.com)",
			location: "Banjarmasin, Indonesia",
			period: "Nov 2024 - Present",
			current: true,
			responsibilities: [
				"Designed and deployed AI services for intelligent JATS file conversion and automated document processing",
				"Implemented ML, NLP, and LLMs to optimize processing pipelines and improve publication accuracy",
				"Fine-tuned models and integrated AI tools into existing platforms for enhanced capabilities"
			],
			technologies: ["Python", "NLP", "LLMs", "Machine Learning", "JATS/XML"]
		},
		{
			title: "Software Engineer",
			company: "Open Journal Theme",
			location: "Banjarmasin, Indonesia",
			period: "Dec 2023 - Nov 2024",
			current: false,
			responsibilities: [
				"Architected monitoring and infrastructure management systems for government agencies at district and provincial levels",
				"Created JATS Editor platform enabling publishers to create and edit JATS/XML files for scientific publications",
				"Enhanced JATS/XML Viewer with accessibility improvements and contributed to technical architecture"
			],
			technologies: ["PHP", "Laravel", "JavaScript", "MySQL", "JATS/XML"]
		},
		{
			title: "Programmer (Self-employed)",
			company: "Freelance",
			location: "",
			period: "Dec 2020 - Nov 2023",
			current: false,
			isFreelance: true,
			projects: [
				{
					name: "Robotics Competition (KRI National 2023)",
					description: "Engineered autonomous navigation system using compass and distance sensors with custom algorithms, enabling robot to complete complex obstacle courses and perform multi-stage tasks",
					technologies: ["Arduino", "C++", "Sensor Integration", "Autonomous Navigation"]
				},
				{
					name: "Smart Robot System (PLN Competition 2022)",
					description: "Led 2-member team to 3rd place finish, developing Raspberry Pi-based robot with Computer Vision and Voice Recognition capabilities; implemented real-time colored object tracking using Python OpenCV and speech-to-command navigation system",
					technologies: ["Raspberry Pi", "Python", "OpenCV", "Computer Vision", "Voice Recognition"],
					achievement: "3rd Place"
				},
				{
					name: "Fuzzy Logic Production Forecasting",
					description: "Built book production prediction system using Fuzzy Logic algorithms to optimize manufacturing decisions based on current stock levels and sales data, improving production planning efficiency",
					technologies: ["Python", "Fuzzy Logic", "Data Analysis", "Algorithm Design"]
				}
			]
		}
	],
	
	education: [
		{
			institution: "Asia Cyber University",
			degree: "Bachelor of Informatics",
			period: "2025 - 2026",
			gpa: "3.90/4.00",
			current: true
		},
		{
			institution: "Politeknik Negeri Banjarmasin",
			degree: "Diploma in Informatics Engineering",
			period: "2020 - 2023",
			gpa: "3.84/4.00",
			current: false
		}
	],
	
	skills: {
		languages: ["Python", "PHP", "JavaScript", "HTML", "CSS", "Go"],
		frameworks: ["Laravel", "CodeIgniter", "Svelte"],
		aiml: ["Machine Learning", "NLP", "Computer Vision", "LLMs", "Model Fine-tuning"],
		database: ["MySQL", "Database Design & Optimization"],
		tools: ["Git", "GitHub", "API Development", "JATS/XML Processing", "RESTful API Design"],
		robotics: ["Raspberry Pi", "Arduino", "Sensor Integration"]
	},
	
	competencies: [
		"Problem Solving",
		"Team Leadership",
		"Agile Development",
		"Technical Documentation",
		"Continuous Learning"
	],
	
	languages: {
		Indonesian: "Native",
		English: "Professional Working Proficiency"
	},
	
	interests: ["Robotics", "Internet of Things (IoT)", "Smart Systems", "Bioinformatics"],
	
	featuredProjects: [
        {
			title: "JATS Editor Platform",
			description: "Full-featured editor for scientific publication XML files",
			image: "/projects/jats-editor.jpg",
			technologies: ["PHP", "Laravel", "JavaScript", "JATS/XML"],
			category: ["web"],
			featured: true,
			link: "https://jatseditor.com"
		},
		{
			title: "Autonomous Navigation Robot - KRI 2024",
			description: "Self-navigating robot for complex obstacle courses with advanced sensors",
			image: "/projects/kri-robot-krai.png",
			technologies: ["Raspberry Pi", "Python", "OpenCV", "Machine Learning"],
			category: "robotics",
			featured: true,
			achievement: "3rd Place"
		},
		{
			title: "Autonomous Navigation Robot - KRI 2023",
			description: "Self-navigating robot for complex obstacle courses",
			image: "/projects/kri-robot.jpeg",
			technologies: ["Arduino", "C++", "Sensor Integration"],
			category: "robotics",
			featured: true,
            achievement: "National Competition Participant"
		},
		{
			title: "AI Document Processing System",
			description: "Intelligent JATS file conversion with NLP and LLMs",
			image: "/projects/project_digital_printing_web.png",
			technologies: ["Python", "NLP", "LLMs", "Machine Learning"],
			category: "web",
			featured: true
		},
		{
			title: "Fuzzy Logic Production System",
			description: "Book production forecasting with intelligent algorithms",
			image: "/projects/fuzzy-logic.jpg",
			technologies: ["Python", "Fuzzy Logic", "Data Analysis"],
			category: "ai",
			featured: false
		},
		{
			title: "Government Monitoring System",
			description: "Infrastructure management for district and provincial levels",
			image: "/projects/gov-system.jpg",
			technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
			category: "web",
			featured: false
		},
        {
			title: "Government Monitoring System",
			description: "Infrastructure management for district and provincial levels",
			image: "/projects/gov-system.jpg",
			technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
			category: "web",
			featured: false
		}
	],
	
	stats: {
		yearsExperience: "5+",
		projectsCompleted: "15+",
		technologiesMastered: "20+",
		competitionsWon: "2"
	}
};
