class MOUSE {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

}


let ctx = document.querySelector("canvas");
let c = ctx.getContext("2d");

ctx.width = innerWidth
ctx.height = innerHeight


let h = ctx.height,
    w = ctx.width;

let MAX_OBJECTS = 1e8 + 5;

let m = new MOUSE();

class sqr {
    constructor(x, y, w, h, dx = 0, dy = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "green"
            //
        this.dx = dx;
        this.dy = dy;
    }
    drow() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
    }


    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.w >= w || this.x <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.h >= h || this.y <= 0) {
            this.dy = -this.dy;
        }
        this.drow();

    }
}
let globalColor = "black";
class Edge {
    constructor(x1, y1, x2, y2, color) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.color = color;
    }
    drow() {
        c.beginPath();
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        c.lineWidth = 3;
        c.strokeStyle = this.color;
        c.stroke();
    }
}


class Circle {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    drow() {
        c.beginPath();
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.lineWidth = 0;
        c.strokeStyle = "transparent";
        c.fill()
        c.stroke();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.radius >= w || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius >= h || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.drow();
    }
}
let random_colors = [
    '#9100ba',
    "black"

];
let arr = [];
let lines = [];
let colors = [];
let Pyth = (x1, y1, x2, y2) => {
    let dx = x1 - x2;
    let dy = y1 - y2;
    let dxdx = dx * dx;
    let dydy = dy * dy;



    return Math.sqrt(dxdx + dydy);
}

function distance(x1, y1, x2, y2) {
    let distance_rc = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    distance_rc = Math.sqrt(distance_rc);
    return distance_rc;
}

function animation() {
    c.clearRect(0, 0, w, h);







    for (let i = 0; i < lines.length; i++) {
        lines[i].drow();
    }


    for (let i = 0; i < arr.length; i++) {
        arr[i].update();
    }
    lines = [];
    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr.length; ++j) {
            if (i == j) continue;
            let x1 = arr[i].x;
            let y1 = arr[i].y;
            let x2 = arr[j].x;
            let y2 = arr[j].y;
            let c = 0;
            if (colors.length < i + 1) {
                c = Math.floor(Math.random() * random_colors.length);
                colors.push(random_colors[c]);
            }
            lines.push(new Edge(x1, y1, x2, y2, colors[i]));
        }
    }




    requestAnimationFrame(animation);
}
requestAnimationFrame(animation);



document.addEventListener("click", (event) => {

    if (arr.length > 200) {
        return;
    }
    let dx = (Math.random() * 10) - 5;
    let dy = (Math.random() * 15) - 5;

    let c = Math.floor(Math.random() * random_colors.length);
    arr.push(new Circle(event.x, event.y, 10, dx, 1, random_colors[c]));


    let x = arr.length;
    document.getElementById("vertices").innerText = `Edges: ${x}`;
    document.getElementById("edges").innerText = `Vertices: ${x * (x - 1) / 2}`;
});


document.getElementById("reload").onclick = function() {
    let temp = window.location;
    window.location = "";
    window.location = temp;

}








/*
document.addEventListener('keypress', (event) => {
    if (event.ctrlKey) {
        console.log("sdas")
    }
    console.log(event.code)
});
*/


/*
if (event.ctrlKey) {
  alert("The CTRL key was pressed!");
} else {
  alert("The CTRL key was NOT pressed!");
}...

*/