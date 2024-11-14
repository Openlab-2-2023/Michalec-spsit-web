function setupTypewriter(t) {
    var HTML = t.innerHTML;

    t.innerHTML = "";

    var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 100,
        tempTypeSpeed = 0;

    var type = function () {

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

document.addEventListener('DOMContentLoaded', function () {
    const top_pagebar = document.querySelectorAll('.top-pagebar a');
    const pages = document.querySelectorAll('.page > div[id^="page-"]');
    const left_pagebar = document.querySelectorAll('.left-sidebar .side-wrapper a');
    const contents = document.querySelectorAll('.content > div');

    top_pagebar.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Remove 'is-active' class from all top_pagebar links
            top_pagebar.forEach(link => link.classList.remove('is-activeT'));

            // Add 'is-active' class to the clicked top_pagebar link
            this.classList.add('is-activeT');

            // Hide all page sections
            pages.forEach(page => page.style.display = 'none');

            // Show the corresponding page section
            const targetElement = document.getElementById(this.id.replace('link-', 'page-'));
            targetElement.style.display = 'flex';
            targetElement.lastElementChild.firstElementChild.style.display = 'unset';

            // Set the first element in the left-sidebar as active
            setFirstElementActive(targetElement);
        });
    });

    left_pagebar.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Remove active class from all links
            left_pagebar.forEach(link => link.classList.remove('is-active'));

            // Add active class to the clicked link
            this.classList.add('is-active');

            // Hide all content sections
            contents.forEach(content => content.style.display = 'none');

            // Show the corresponding content section
            const content = document.getElementById(this.id.replace('link-', 'content-'));
            if (content) {
                content.style.display = 'unset';
            } else {
                console.log('No content found');
            }
        });
    });

    // Function to set the first element in left-sidebar as active
    function setFirstElementActive(targetElement) {
        const firstLink = targetElement.querySelector('.left-sidebar .side-wrapper a');

        // Remove active class from all links
        left_pagebar.forEach(link => link.classList.remove('is-active'));
        //left_pagebar[0].classList.add('is-active');
        // Add active class to the first link
        firstLink.classList.add('is-active');
    }
});