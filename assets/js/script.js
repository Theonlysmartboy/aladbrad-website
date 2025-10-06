// Tab functionality for services section
document.addEventListener("DOMContentLoaded", function () {
	const tabBtns = document.querySelectorAll(".tab-btn");
	const serviceDetails = document.querySelectorAll(".service-details");
	//Mobile Menu Toggle
	const mobileMenuBtn = document.querySelector(".mobile-menu");
	const nav = document.querySelector("nav ul");
	// Quote Form submission
	const quoteForm = document.getElementById("quoteForm");

	if (mobileMenuBtn && nav) {
		mobileMenuBtn.addEventListener("click", function () {
			// Toggle mobile menu visibility
			nav.style.display = nav.style.display === "flex" ? "none" : "flex";

			// Change icon based on menu state
			const icon = this.querySelector("i");
			if (nav.style.display === "flex") {
				icon.classList.remove("fa-bars");
				icon.classList.add("fa-times");
			} else {
				icon.classList.remove("fa-times");
				icon.classList.add("fa-bars");
			}
		});

		// Close mobile menu when clicking on a link
		const navLinks = document.querySelectorAll("nav ul li a");
		navLinks.forEach((link) => {
			link.addEventListener("click", function () {
				if (window.innerWidth <= 768) {
					nav.style.display = "none";
					const icon = mobileMenuBtn.querySelector("i");
					icon.classList.remove("fa-times");
					icon.classList.add("fa-bars");
				}
			});
		});

		// Handle window resize
		window.addEventListener("resize", function () {
			if (window.innerWidth > 768) {
				nav.style.display = "flex";
				const icon = mobileMenuBtn.querySelector("i");
				icon.classList.remove("fa-times");
				icon.classList.add("fa-bars");
			} else {
				nav.style.display = "none";
			}
		});
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
