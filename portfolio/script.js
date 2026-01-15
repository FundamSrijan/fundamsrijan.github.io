// Get Theme
document.getElementById("theme-" + (localStorage.getItem("theme") ?? "default")).checked = true;

// Copy Text Function
const copyText = (method, text) => {
    navigator.clipboard.writeText(text);
    alert("Copied " + method + " : " + text);
}

// Hotbar Script
document.getElementById("hotbar").addEventListener("click", (e) => {
    
    // Set Theme
    e.target.closest("#theme") !== null ? localStorage.setItem("theme", e.target.closest("#theme > input:checked").id.slice(6)) : {};
    
    // Copy Contact (Perfectly Readable :)
    e.target.closest(".contact") !== null ? copyText(...{
        "contact-email": ["email address", "srijancreates832@gmail.com"],
        "contact-discord": ["discord username", "fundamsrijan"],
        "contact-whatsapp": ["whatsapp number", "9560498832"],
        "contact-website": ["website link", "https://fundamsrijan.github.io/portfolio"]
    }[e.target.closest(".contact").id]) : {};
});