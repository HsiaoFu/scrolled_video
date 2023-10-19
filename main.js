$(function() {
    const videoElement = $('#video').get(0);
    const videoElement2 = $('#video2').get(0); // 获取第二个视频元素
    const sectionHeight = 200; // 200vh的高度，这里200表示200vh

    if (!videoElement) {
        console.error("Video element not found");
        return;
    }
    
    if (!videoElement2) {
        console.error("Second video element not found");
        return;
    }

    const maxScroll = $(document).height() - $(window).height();

    $(window).scroll(function() {
        const currentScrollPosition = $(document).scrollTop();

        if (videoElement.duration && videoElement2.duration) {
            const videoPlayTime = videoElement.duration * (currentScrollPosition / maxScroll);
            const video2PlayTime = videoElement2.duration * (currentScrollPosition / maxScroll);
            const currentSection = Math.floor(currentScrollPosition / sectionHeight);
            const nextSection = currentSection + 1;
            const nextSectionScrollPosition = nextSection * sectionHeight;

            if (currentScrollPosition > nextSectionScrollPosition) {
                // 已经滚动到下一个section，停止视频1和视频2
                videoElement.pause();
                videoElement2.pause();
            } else {
                // 在当前section，播放视频1和视频2
                videoElement.currentTime = videoPlayTime;
                videoElement2.currentTime = video2PlayTime;
                videoElement.play();
                videoElement2.play();
            }
        } else {
            console.warn("Video duration is not available");
        }
    });
});
