const slider = document.getElementById("loveSlider");
const value = document.getElementById("loveValue");
const text = document.getElementById("loveText");

slider.oninput = function(){

    value.innerHTML = this.value + "%";

    if(this.value < 20){

        text.innerHTML=" just friend 😔";

    }else if(this.value < 40){

        text.innerHTML=" mulai suka dikitt 🤔";

    }else if(this.value < 60){

        text.innerHTML=" sayanggg 🫶";

    }else if(this.value < 80){

        text.innerHTML=" sayangggg bangetttttt 🤍🤍🤍🤍🤍🤍🤍🤍🤍";

    }else if(this.value < 100){

        text.innerHTML=" aku ga mau kehilangan kamuuu 🤭";

    }else{

        text.innerHTML=" mau menghabiskan masa tua sama kamu hehehe 😝💍❤️";
        tampilLove();
    }

}

function mulaiJourney(){

    document.getElementById("love").scrollIntoView({

        behavior:"smooth"

    });

}
// KIRIM PESAN KE FIREBASE

function kirimPesan() {

    const nama = document.getElementById("nama").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    if (nama === "" || pesan === "") {

        alert("Isi nama dan pesan dulu ya 💙");
        return;

    }

    db.collection("messages").add({

        nama: nama,
        pesan: pesan,
        waktu: firebase.firestore.FieldValue.serverTimestamp()

    })

    .then(() => {

        alert("💙 Pesan berhasil dikirim!");

        document.getElementById("nama").value = "";
        document.getElementById("pesan").value = "";

    })

    .catch((error) => {

        console.error(error);

        alert("Gagal mengirim pesan!");

    });

}

// TAMPILKAN DATA FIREBASE

db.collection("messages")
.orderBy("waktu", "desc")
.onSnapshot((snapshot) => {

    const list = document.getElementById("listPesan");

    list.innerHTML = "";

    snapshot.forEach((doc) => {

        const data = doc.data();

        list.innerHTML += `

            <div class="pesan-item">

                <div class="atasPesan">

                    <h4>💙 ${data.nama}</h4>

                    <button class="hapusBtn" onclick="hapusPesan('${doc.id}')">
                    🗑
                    </button>

                </div>

                <p>${data.pesan}</p>

            </div>

        `;
    });

});

function hapusPesan(id){

    if(confirm("Yakin ingin menghapus pesan ini?")){

        db.collection("messages")
        .doc(id)
        .delete()
        .then(() => {

            alert("Pesan berhasil dihapus!");

        })
        .catch((error) => {

            console.log(error);

        });

    }

}

// =======================
// LOVE EFFECT
// =======================

function tampilLove(){

    const emoji=[
        "💙","❤️","💕","💖",
        "💗","💘","💝","💞",
        "🤍","🩵","💜","💛"
    ];

    // keluar love setiap 200ms
    const interval = setInterval(()=>{

        for(let i=0;i<6;i++){

            const item=document.createElement("div");

            item.className="flying-heart";
            item.innerHTML=emoji[Math.floor(Math.random()*emoji.length)];

            item.style.left=Math.random()*100+"vw";
            item.style.top="100vh";
            item.style.fontSize=(20+Math.random()*35)+"px";

            item.style.setProperty("--x",(Math.random()*2)-1);

            document.body.appendChild(item);

            setTimeout(()=>{
                item.remove();
            },5000);

        }

    },200);

    // berhenti setelah 10 detik
    setTimeout(()=>{
        clearInterval(interval);
    },10000);

}