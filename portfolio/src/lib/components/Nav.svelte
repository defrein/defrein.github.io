<script>
	import { Menu, X, Sun, Moon } from 'lucide-svelte';
	import { resumeData } from '$lib/data/resume.js';
	import { onMount } from 'svelte';
	
	let mobileMenuOpen = $state(false);
	let activeSection = $state('hero');
	let isDarkMode = $state(true);
	
	const navLinks = [
		{ href: '#about', label: 'About' },
		{ href: '#experience', label: 'Experience' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#contact', label: 'Contact' }
	];
	
	onMount(() => {
		// Check for saved theme preference or default to dark
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'light') {
			isDarkMode = false;
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
		} else {
			isDarkMode = true;
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		}
	});
	
	function toggleTheme() {
		isDarkMode = !isDarkMode;
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
			localStorage.setItem('theme', 'light');
		}
	}
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	/**
	 * @param {string} href
	 */
	function handleNavClick(href) {
		mobileMenuOpen = false;
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
	
	// Track active section
	$effect(() => {
		if (typeof window === 'undefined') return;
		
		const handleScroll = () => {
			const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
			const scrollPosition = window.scrollY + 100;
			
			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const offsetTop = element.offsetTop;
					const offsetHeight = element.offsetHeight;
					
					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						activeSection = section;
						break;
					}
				}
			}
		};
		
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav class="fixed top-0 left-0 right-0 z-50 glass-effect">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo/Name -->
			<a href="#hero" class="flex items-center space-x-2" onclick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
				<span class="text-2xl font-heading font-bold text-gradient">{resumeData.personal.nickname}</span>
			</a>
			
			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-text-muted hover:text-text transition-colors duration-300 relative group"
						class:text-secondary={activeSection === link.href.slice(1)}
						onclick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
					>
						{link.label}
						<span 
							class="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"
							class:w-full={activeSection === link.href.slice(1)}
						></span>
					</a>
				{/each}
				
				<!-- Theme Toggle Button -->
				<button
					onclick={toggleTheme}
					class="p-2 rounded-lg glass-effect hover:bg-secondary/20 transition-all duration-300 border border-border hover:border-secondary"
					aria-label="Toggle theme"
				>
					{#if isDarkMode}
						<Sun class="w-5 h-5 text-text-muted hover:text-secondary transition-colors" />
					{:else}
						<Moon class="w-5 h-5 text-text-muted hover:text-secondary transition-colors" />
					{/if}
				</button>
			</div>
			
			<!-- Mobile Menu Button -->
			<button
				class="md:hidden text-text hover:text-secondary transition-colors"
				onclick={toggleMobileMenu}
				aria-label="Toggle menu"
			>
				{#if mobileMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</div>
	</div>
	
	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden bg-surface/95 backdrop-blur-lg border-t border-border">
			<div class="px-4 py-4 space-y-3">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block text-text-muted hover:text-text transition-colors duration-300 py-2"
						class:text-secondary={activeSection === link.href.slice(1)}
						onclick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
					>
						{link.label}
					</a>
				{/each}
				
				<!-- Theme Toggle for Mobile -->
				<button
					onclick={toggleTheme}
					class="flex items-center gap-2 w-full text-text-muted hover:text-text transition-colors duration-300 py-2"
				>
					{#if isDarkMode}
						<Sun class="w-5 h-5" />
						<span>Light Mode</span>
					{:else}
						<Moon class="w-5 h-5" />
						<span>Dark Mode</span>
					{/if}
				</button>
			</div>
		</div>
	{/if}
</nav>
