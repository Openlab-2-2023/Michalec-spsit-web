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
    const top_pagebar = document.querySelectorAll('.top-pagebar a');
    const pages = document.querySelectorAll('.page > div[id^="page-"]');

    top_pagebar.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();

        // Remove 'is-active' class from all links
        links.forEach(link => link.classList.remove('is-active'));

        // Add 'is-active' class to the clicked link
        this.classList.add('is-active');

        // Hide all page sections
        pages.forEach(page => page.style.display = 'none');

        // Show the corresponding page section
        const targerElement = document.getElementById(this.id.replace('link-', 'page-'));
        console.log(this.id.replace('link-', 'page-'))
        targerElement.getElementsByClassName('content')[0].firstElementChild.style.display = "unset";
        targerElement.getElementsByClassName('side-wrapper')[0].getElementsByTagName('a')[0].classList.add('is-active');
        targerElement.style.display = 'flex'
      });
    });

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
            const content = document.getElementById(this.id.replace('link-', 'content-'));
            console.log(this.id.replace('link-', 'content-'))

            if (content) {
                content.style.display = 'unset';
            }
            else {
                console.log('No content found');
            }
        });
    });
});