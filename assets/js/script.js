// Tab functionality for services section
document.addEventListener("DOMContentLoaded", function () {
	const tabBtns = document.querySelectorAll(".tab-btn");
	const serviceDetails = document.querySelectorAll(".service-details");

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

	// Form submission
	const quoteForm = document.getElementById("quoteForm");
	if (quoteForm) {
		quoteForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Get form data
			const formData = new FormData(this);
			const name = formData.get("name");
			const email = formData.get("email");
			const phone = formData.get("phone");
			const service = formData.get("service");
			const message = formData.get("message");

			// Create WhatsApp message
			const whatsappMessage = `New Service Inquiry from Adalbrad Website:%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AService: ${service}%0AMessage: ${message}`;
			const whatsappUrl = `https://wa.me/254717549742?text=${whatsappMessage}`;

			// Create email message
			const emailSubject = `Service Inquiry: ${service}`;
			const emailBody = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AService: ${service}%0AMessage: ${message}`;
			const mailtoUrl = `mailto:adalbrad@gmail.com?subject=${encodeURIComponent(
				emailSubject
			)}&body=${emailBody}`;

			// Open both (user can choose)
			window.open(whatsappUrl, "_blank");
			setTimeout(() => {
				window.location.href = mailtoUrl;
			}, 1000);

			// Reset form
			this.reset();

			// Show confirmation
			alert(
				"Thank you for your inquiry! You will be redirected to WhatsApp and email to complete your request."
			);
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
