const form = document.getElementById("vote-form");

// getting params
getparams=()=>{
    var url=window.location.href
    let a=url.split('/')
    return a[4];
}
// socket
var socket = io();
// on connection
socket.on('connect',()=>{
    console.log('new user connected');
    socket.emit('join',{
        room:getparams()
    })
})

socket.on('voteCount',(data)=>{
    console.log('i m');
    console.log(data);
})
socket.on("disconnect", function () {
    console.log(" server disconnected");
  });

// Form Submit Event
// form.addEventListener("submit", (e) => {
//   const choice = document.querySelector("input[name=os]:checked").value;
//   const data = { os: choice };

//   fetch("http://localhost:3000/poll", {
//     method: "post",
//     body: JSON.stringify(data),
//     headers: new Headers({
//       "Content-Type": "application/json",
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));

//   e.preventDefault();
// });

// fetch("http://localhost:3000/poll")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     const votes = data.votes;
//     const totalVotes = votes.length;
//     // Count vote points - acc/current
//     const voteCounts = votes.reduce(
//       (acc, vote) => (
//         (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
//       ),
//       {}
//     );

//     let dataPoints = [
//       { label: "Windows", y: voteCounts.Windows },
//       { label: "MacOS", y: voteCounts.MacOS },
//       { label: "Linux", y: voteCounts.Linux },
//       { label: "Other", y: voteCounts.Other },
//     ];

//     const chartContainer = document.querySelector("#chartContainer");
//     console.log("11");

//     if (chartContainer) {
//       console.log("1");
//       const chart = new CanvasJS.Chart("chartContainer", {
//         animationEnabled: true,
//         theme: "theme1",
//         title: {
//           text: `Total Votes ${totalVotes}`,
//         },
//         data: [
//           {
//             type: "column",
//             dataPoints: dataPoints,
//           },
//         ],
//       });
//       chart.render();

//       // Enable pusher logging - don't include this in production
//       Pusher.logToConsole = true;

//       var pusher = new Pusher("0c6e1e724fc994c33998", {
//         cluster: "us2",
//         encrypted: true,
//       });

//       var channel = pusher.subscribe("os-poll");
//       channel.bind("os-vote", function (data) {
//         dataPoints = dataPoints.map((x) => {
//           if (x.label == data.os) {
//             x.y += data.points;
//             return x;
//           } else {
//             return x;
//           }
//         });
//         chart.render();
//       });
//     }
//   });
