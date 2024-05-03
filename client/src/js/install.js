const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
	
	window.deferredPrompt = event; // Store the triggered events in a new property
	butInstall.classList.toggle('hidden', false); // In CSS, we see that button has a hidden class 

});

butInstall.addEventListener('click', async () => {
	
	const promptEvent = window.deferredPrompt;

	if (!promptEvent) {
		return;
	}

	// Show prompt
	promptEvent.prompt();

	window.deferredPrompt = null;

	butInstall.classList.toggle('hidden', true);

});

window.addEventListener('appinstalled', (event) => {
	// Clear prompt
	window.deferredPrompt = null;
});
