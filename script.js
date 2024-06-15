document.addEventListener("DOMContentLoaded", () => {
    const range = document.querySelector(".volume-range");
    const barHoverBox = document.querySelector(".bar-hoverbox");
    const fill = document.querySelector(".bar-fill");
    const icon = document.querySelector(".icon i");
    const audio = document.getElementById("audioPlayer");
    const audioButtons = document.querySelectorAll('.audio-button');
    var video = document.getElementById('background-video');
    var source = video.getElementsByTagName('source')[0];

  
    let previousValue = range.value;
    let isMuted = false;
    let currentVideoId = null;
  
    // Fonction pour mettre à jour la barre de volume visuelle
    const updateVolumeBar = (value) => {
        fill.style.width = value + "%";
        range.value = value; // Mise à jour directe de la valeur du range
        updateIcon(value);
        updateAudioVolume(value);
        console.log(value);
    };
  
    // Fonction pour mettre à jour l'icône du volume en fonction de la valeur
    const updateIcon = (value) => {
        if (value == 0) {
            icon.className = "fa fa-2x fa-volume-off icon-size";
        } else if (value < 50) {
            icon.className = "fa fa-2x fa-volume-down icon-size";
        } else {
            icon.className = "fa fa-2x fa-volume-up icon-size";
        }
    };
  
    // Fonction pour mettre à jour le volume de l'audio en fonction de la valeur du range
    const updateAudioVolume = (value) => {
        audio.volume = value / 100;
    };
  
    // Initialiser la barre de volume avec la valeur par défaut du range
    updateVolumeBar(range.value);
  
    // Gestion des événements sur le range pour la barre de volume visuelle
    range.addEventListener("input", (e) => {
        const value = e.target.value;
        updateVolumeBar(value);
    });
  
    // Gestion du clic sur l'icône pour activer/désactiver le mode muet
    icon.addEventListener("click", () => {
        if (isMuted) {
            // Rétablir le volume précédent avant le mode muet
            updateVolumeBar(previousValue);
            isMuted = false;
        } else {
            // Activer le mode muet
            previousValue = range.value;
            updateVolumeBar(0);
            isMuted = true;
        }
    });
  
    // Jouer un son et changer le fond du site

    audioButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {

        // Jouer le son correspondant
        var audioSrc = this.getAttribute('data-src');
        audioPlayer.src = audioSrc;
        audioPlayer.play();

         // Vérifier si c'est le même bouton qui a été cliqué
         if (this.id === currentVideoId) {
            console.log('La même vidéo est déjà affichée.');
            return;  // Sortir de la fonction sans rien faire de plus
        }

        // Mettre à jour l'ID de la vidéo actuellement affichée
        currentVideoId = this.id;

        // Changer la source vidéo
        var newVideoFile = event.target.id;
        source.src = 'Videos/' + newVideoFile + '.mp4';
        video.load();
        video.play();

        console.log(newVideoFile);
    });
});

  
    // Gestion des événements de la barre de volume visuelle
    const calculateFill = (e) => {
        const rect = barHoverBox.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        const width = rect.width - 30;
        const newValue = Math.max(Math.min((offsetX - 15) / width * 100.0, 100.0), 0);
        updateVolumeBar(newValue);
    };
  
    let isMouseDown = false;
  
    // Gestion des événements de la barre de volume pour desktop
    barHoverBox.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        calculateFill(e);
    });
  
    document.addEventListener("mousemove", (e) => {
        if (isMouseDown) {
            calculateFill(e);
        }
    });
  
    document.addEventListener("mouseup", () => {
        isMouseDown = false;
    });
  
    // Gestion des événements de la barre de volume pour mobile
    barHoverBox.addEventListener("touchstart", (e) => {
        isMouseDown = true;
        calculateFill(e.touches[0]);
    });
  
    barHoverBox.addEventListener("touchmove", (e) => {
        if (isMouseDown) {
            calculateFill(e.touches[0]);
        }
    });
  
    document.addEventListener("touchend", () => {
        isMouseDown = false;
    });
  });
  