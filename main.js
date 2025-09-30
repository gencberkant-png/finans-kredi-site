// Kredi hesaplayıcı
document.getElementById('calculateBtn').addEventListener('click', function(){
    let amount = parseFloat(document.getElementById('amount').value);
    let interest = parseFloat(document.getElementById('interest').value)/100/12;
    let months = parseInt(document.getElementById('months').value);
    let resultDiv = document.getElementById('result');
    let chartBar = document.getElementById('chart-bar');

    if(isNaN(amount) || isNaN(interest) || isNaN(months)){
        resultDiv.innerText = "Lütfen tüm alanları doldurun!";
        chartBar.style.width="0%";
        return;
    }

    let monthly=(amount*interest)/(1-Math.pow(1+interest,-months));
    resultDiv.innerText="Aylık Ödeme: ₺"+monthly.toFixed(2);
    chartBar.style.width=Math.min((monthly/amount)*100,100)+"%";
});

// Scroll animasyonları
let sections=document.querySelectorAll('section');
window.addEventListener('scroll',()=>{
sections.forEach(sec=>{
let top=sec.getBoundingClientRect().top;
if(top<window.innerHeight-100) sec.classList.add('visible');
});
});

// Slider
let testimonialIndex=0;
const container=document.getElementById('testimonialContainer');
setInterval(()=>{
testimonialIndex=(testimonialIndex+1)%container.children.length;
container.style.transform=`translateX(-${testimonialIndex*100}%)`;
},4000);

// İstatistik animasyonu
function animateStats(id,target){
    let el=document.getElementById(id);
    let count=0;
    let interval=setInterval(()=>{
        if(count>=target) clearInterval(interval);
        else { count++; el.innerText=count; }
    },20);
}
window.addEventListener('scroll',()=>{
    let statsTop=document.querySelector('.stats').getBoundingClientRect().top;
    if(statsTop<window.innerHeight-50){
        animateStats('approved',125);
        animateStats('clients',300);
        animateStats('years',10);
    }
},{once:true});

// Faiz grafiği
const ctx=document.getElementById('rateChart').getContext('2d');
const rateChart=new Chart(ctx,{
    type:'bar',
    data:{
        labels:['Akbank','Yapı Kredi','VakıfBank'],
        datasets:[{
            label:'Faiz Oranı (%)',
            data:[1.45,1.50,1.48],
            backgroundColor:'#0d6efd'
        }]
    },
    options:{responsive:true, scales:{y:{beginAtZero:true}}}
});
