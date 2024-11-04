function setupTypewriter(t) {
    var HTML = t.innerHTML;

    t.innerHTML = "";

    var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 100,
        tempTypeSpeed = 0;

    var type = function() {

        if (writingTag === true) {
            tag += HTML[cursorPosition];
        }

        if (HTML[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            }
            else {
                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            }
            t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement("span");
                t.appendChild(newSpan);
                newSpan.innerHTML = tag;
                tag = newSpan.firstChild;
            }
        }

        cursorPosition += 1;
        if (cursorPosition < HTML.length - 1) {
            setTimeout(type, tempTypeSpeed);
        }

    };

    return {
        type: type
    };
}

// var typer = document.getElementById('title2').getElementsByTagName('h1')[0];

// typewriter = setupTypewriter(typer);

// typewriter.type();

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.side-wrapper a');
    const contents = document.querySelectorAll('.content > div');

    links.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            links.forEach(link => link.classList.remove('is-active'));
            // Add active class to the clicked link
            this.classList.add('is-active');

            // Hide all content sections
            contents.forEach(content => content.style.display = 'none');
            // Show the corresponding content section
            const contentId = this.id.replace('link-', 'content-');
            document.getElementById(contentId).style.display = 'block';
        });
    });
});