document.addEventListener('DOMContentLoaded', function() {
    var audioPlayer = document.getElementById('audioPlayer');
    var audioButtons = document.querySelectorAll('.audio-button');
    var volumeControl = document.getElementById('volumeControl');
    var volumeImage = document.getElementById('volumeImage');
    var volumeContainer = document.querySelector('.volume-container');

    audioButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var audioSrc = this.getAttribute('data-src');
            audioPlayer.src = audioSrc;
            audioPlayer.play();
        });
    });

    volumeImage.addEventListener('click', function() {
        if (audioPlayer.volume === 0) {
            audioPlayer.volume = 1; // Rétablir le volume
            volumeControl.classList.remove('muted');
        } else {
            audioPlayer.volume = 0; // Mettre le volume à zéro
            volumeControl.classList.add('muted');
        }
        toggleVolumeControlVisibility(); // Appeler la fonction pour gérer la visibilité
    });

    volumeControl.addEventListener('input', function() {
        audioPlayer.volume = this.value;
        if (this.value > 0) {
            volumeControl.classList.remove('muted');
        } else {
            volumeControl.classList.add('muted');
        }
        toggleVolumeControlVisibility(); // Appeler la fonction pour gérer la visibilité
    });

    function toggleVolumeControlVisibility() {
        if (volumeControl.classList.contains('muted')) {
            volumeControl.classList.add('hidden'); // Ajouter la classe hidden
            volumeImage.src = "muted.png"; // Changer l'image en muted.png
        } else {
            volumeControl.classList.remove('hidden'); // Retirer la classe hidden
            volumeImage.src = "volume.png"; // Changer l'image en volume.png
        }
    }
});
