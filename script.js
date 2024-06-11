document.addEventListener('DOMContentLoaded', function() {
    var audioPlayer = document.getElementById('audioPlayer');
    var audioButtons = document.querySelectorAll('.audio-button');

    audioButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var audioSrc = this.getAttribute('data-src');
            audioPlayer.src = audioSrc;
            audioPlayer.play();
        });
    });
});
