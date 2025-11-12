// index.js
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://192.168.1.6:3000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObj),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          text || `Server responded with status ${response.status}`
        );
      }

      const data = await response.text();
      alert(data); // Show success message
      event.target.reset(); // Clear form after sending
    } catch (error) {
      console.error("❌ Fetch error:", error);
      alert(
        `Error sending message: ${error.message}\nMake sure your server is running.`
      );
    }
  });
