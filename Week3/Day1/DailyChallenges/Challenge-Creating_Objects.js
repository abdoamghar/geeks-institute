class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time;
    }

    watch() {
        console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
    }
}


const video1 = new Video("JavaScript Basics", "karim", 300);
video1.watch();


const video2 = new Video("Learn Python", "yassine", 500);
video2.watch();


const videoData = [
    { title: "HTML Basics", uploader: "aymen", time: 200 },
    { title: "CSS Basics", uploader: "sara", time: 250 },
    { title: "JavaScript Basics", uploader: "youssef", time: 400 },
    { title: "Python Basics", uploader: "Lisa", time: 350 },
    { title: "React Basics", uploader: "Tom", time: 600 }
];


const videos = [];

videoData.forEach(video => {
    videos.push(new Video(video.title, video.uploader, video.time));
});

console.log(videos);