<script>
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Education from '$lib/components/Education.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Wahni Adnani - AI Engineer | Software Engineer | Portfolio</title>
	<meta name="description" content="Portfolio of Wahni Adnani - Software Engineer with 5+ years building full-stack applications and AI-driven systems. Specialized in ML, NLP, computer vision, and robotics." />
	<meta name="keywords" content="AI Engineer, Software Engineer, Machine Learning, NLP, Computer Vision, Robotics, Full Stack Developer, Wahni Adnani" />
	<meta name="author" content="Wahni Adnani" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Wahni Adnani - AI Engineer | Software Engineer" />
	<meta property="og:description" content="Software Engineer with 5+ years building full-stack applications and AI-driven systems." />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Wahni Adnani - AI Engineer | Software Engineer" />
	<meta property="twitter:description" content="Software Engineer with 5+ years building full-stack applications and AI-driven systems." />
</svelte:head>

<div class="relative">
	<!-- Navigation -->
	<Nav />
	
	<!-- Main Content -->
	<main class="relative">
		<Hero />
		<About />
		<Experience />
		<Projects />
		<Skills />
		<Education />
		<Contact />
	</main>
	
	<!-- Footer -->
	<Footer />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
