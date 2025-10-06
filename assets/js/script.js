// Tab functionality for services section
document.addEventListener("DOMContentLoaded", function () {
	const tabBtns = document.querySelectorAll(".tab-btn");
	const serviceDetails = document.querySelectorAll(".service-details");
	//Mobile Menu Toggle
	const mobileMenuBtn = document.querySelector(".mobile-menu");
	const nav = document.querySelector("nav ul");
	// Quote Form submission
	const quoteForm = document.getElementById("quoteForm");

	// Active menu item functionality
	const sections = document.querySelectorAll("section[id]");
	const navLinks = document.querySelectorAll("nav ul li a");

	// Function to update active menu item
	function updateActiveMenu() {
		let current = "";
		const scrollY = window.pageYOffset;

		sections.forEach((section) => {
			const sectionHeight = section.offsetHeight;
			const sectionTop = section.offsetTop - 100; // Offset for header
			const sectionId = section.getAttribute("id");

			if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
				current = sectionId;
			}
		});

		// Remove active class from all links
		navLinks.forEach((link) => {
			link.classList.remove("active");
			if (link.getAttribute("href") === `#${current}`) {
				link.classList.add("active");
			}
		});
	}

	// Update active menu on scroll
	window.addEventListener("scroll", updateActiveMenu);

	// Update active menu on click
	navLinks.forEach((link) => {
		link.addEventListener("click", function () {
			// Remove active class from all links
			navLinks.forEach((link) => link.classList.remove("active"));

			// Add active class to clicked link
			this.classList.add("active");

			// Close mobile menu if open
			if (window.innerWidth <= 768) {
				const nav = document.querySelector("nav ul");
				const mobileMenuBtn = document.querySelector(".mobile-menu");
				const icon = mobileMenuBtn.querySelector("i");

				nav.style.display = "none";
				nav.classList.remove("show");
				document.body.style.overflow = "";

				if (icon) {
					icon.classList.remove("fa-times");
					icon.classList.add("fa-bars");
				}
			}
		});
	});

	// Initialize active menu on page load
	updateActiveMenu();

	if (mobileMenuBtn && nav) {
		// Initialize - hide menu on mobile by default
		if (window.innerWidth <= 768) {
			nav.style.display = "none";
		}

		mobileMenuBtn.addEventListener("click", function (e) {
			e.stopPropagation(); // Prevent event bubbling

			console.log("Menu button clicked");
			const isMenuOpen =
				nav.style.display === "flex" || nav.classList.contains("show");

			if (isMenuOpen) {
				// Close menu
				nav.style.display = "none";
				nav.classList.remove("show");
				document.body.style.overflow = "";

				// Change icon to bars
				const icon = this.querySelector("i");
				if (icon) {
					icon.classList.remove("fa-times");
					icon.classList.add("fa-bars");
				}
			} else {
				// Open menu
				nav.style.display = "flex";
				nav.classList.add("show");
				document.body.style.overflow = "hidden";

				// Change icon to times
				const icon = this.querySelector("i");
				if (icon) {
					icon.classList.remove("fa-bars");
					icon.classList.add("fa-times");
				}
			}
		});

		// Close mobile menu when clicking on a link
		const navLinks = document.querySelectorAll("nav ul li a");
		navLinks.forEach((link) => {
			link.addEventListener("click", function () {
				if (window.innerWidth <= 768) {
					nav.style.display = "none";
					nav.classList.remove("show");
					document.body.style.overflow = "";

					const icon = mobileMenuBtn.querySelector("i");
					if (icon) {
						icon.classList.remove("fa-times");
						icon.classList.add("fa-bars");
					}
				}
			});
		});

		// Close mobile menu when clicking outside
		document.addEventListener("click", function (e) {
			if (window.innerWidth <= 768) {
				if (
					nav.style.display === "flex" &&
					!nav.contains(e.target) &&
					!mobileMenuBtn.contains(e.target)
				) {
					nav.style.display = "none";
					nav.classList.remove("show");
					document.body.style.overflow = "";

					const icon = mobileMenuBtn.querySelector("i");
					if (icon) {
						icon.classList.remove("fa-times");
						icon.classList.add("fa-bars");
					}
				}
			}
		});

		// Handle window resize
		window.addEventListener("resize", function () {
			if (window.innerWidth > 768) {
				// Show menu on desktop
				nav.style.display = "flex";
				nav.classList.remove("show");
				document.body.style.overflow = "";

				// Reset icon
				const icon = mobileMenuBtn.querySelector("i");
				if (icon) {
					icon.classList.remove("fa-times");
					icon.classList.add("fa-bars");
				}
			} else {
				// Hide menu on mobile
				nav.style.display = "none";
				nav.classList.remove("show");
			}
		});
	} else {
		console.error("Mobile menu elements not found");
	}

	tabBtns.forEach((btn) => {
		btn.addEventListener("click", function () {
			// Remove active class from all buttons and content
			tabBtns.forEach((b) => b.classList.remove("active"));
			serviceDetails.forEach((detail) =>
				detail.classList.remove("active")
			);

			// Add active class to clicked button
			this.classList.add("active");

			// Show corresponding content
			const tabId = this.getAttribute("data-tab");
			document.getElementById(tabId).classList.add("active");
		});
	});

	if (quoteForm) {
		quoteForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Show loading state
			const submitBtn = this.querySelector('button[type="submit"]');
			const originalText = submitBtn.textContent;
			submitBtn.textContent = "Sending...";
			submitBtn.disabled = true;

			// Get form data
			const formData = new FormData(this);

			// Send AJAX request
			fetch(this.action, {
				method: "POST",
				body: formData,
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						// Show success message
						Swal.fire({
							icon: "success",
							title: "Message Sent!",
							text: "Thank you for your inquiry. We will get back to you soon.",
							toast: true,
							position: "top-end",
							showConfirmButton: false,
							timer: 20000,
							timerProgressBar: true,
						});

						// Reset form
						this.reset();
					} else {
						// Show error message
						Swal.fire({
							icon: "error",
							title: "Error",
							text:
								data.message ||
								"Sorry, there was an error sending your message. Please try again.",
							toast: true,
							position: "top-end",
							showConfirmButton: false,
							timer: 20000,
							timerProgressBar: true,
						});
					}
				})
				.catch((error) => {
					console.error("Error:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Sorry, there was an error sending your message. Please try again.",
						toast: true,
						position: "top-end",
						showConfirmButton: false,
						timer: 20000,
						timerProgressBar: true,
					});
				})
				.finally(() => {
					// Reset button state
					submitBtn.textContent = originalText;
					submitBtn.disabled = false;
				});
		});
	}

	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			if (targetId === "#") return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 80,
					behavior: "smooth",
				});
			}
		});
	});
});
