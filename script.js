// Getting Theme From User's Local Storage
document.getElementById("theme-" + (localStorage.getItem("theme") ?? "default")).checked = true;

// Opening the page based on URL
document.getElementById("page-" + ((new URLSearchParams(window.location.search)).get("page") ?? "home")).checked = true;

const link = new URL(window.location.href);

document.body.addEventListener("click", (e) => {
    // Contact Button expands some sections
    e.target.closest(".contact") !== null ? document.getElementById("expand-about").checked = true :
    
    // Setting Theme Back
    e.target.closest("#theme") !== null ? localStorage.setItem('theme', e.target.closest('#theme > input:checked').id.slice(6)) :
    
    // Setting the URL Back
    e.target.closest('input[name="page"]') !== null ? (
        link.searchParams.set("page", document.querySelector('input[name="page"]:checked').id.slice(5)),
        window.history.replaceState(null, "", link.href)
    ) : {} ;
});