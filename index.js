$(document).ready(function () {
  connections = {
    0: [1, 6],
    1: [0, 2, 6],
    2: [1, 3],
    3: [2, 4, 6],
    4: [3, 5],
    5: [4, 7, 8],
    6: [0, 1, 3, 7],
    7: [5, 6, 9, 10],
    8: [5, 11, 15],
    9: [7, 12, 14],
    10: [7, 11, 12],
    11: [8, 10, 15],
    12: [9, 10, 13, 15],
    13: [12, 14],
    14: [9, 13, 15],
    15: [8, 11, 12, 14],
  };

  for (let i = 0; i < 16; i++) {
    $("#buttons").append(
      `<button class='btn btn-secondary btn-triangle btn-${i}' btn-number='${i}'>${i}</button>`
    ); // ${String.fromCharCode(97 + i)}
  }

  $(".btn-triangle").click(function () {
    toggleButton($(this));
  });

  $("#buttons").append(
    `<button class='btn btn-primary' id='btn-confirm'>Confirm</button>`
  );

  $("#btn-confirm").click(function () {
    $(".btn-triangle").click(function () {
      let pressed = $(this).attr("btn-number");
      let c = connections[pressed];

      for (const i of c) {
        let btn = $(`.btn-${i}`);
        toggleButton(btn);
      }

      let txt = $("#log").text();
      if (txt.endsWith(` ${pressed}`)) {
        $("#log").text(txt.substring(0, txt.length - ` ${pressed}`.length));
      } else {
        $("#log").append(` ${pressed}`);
      }

      if ($(".btn-triangle.btn-primary").length === 16) {
        let filename = "egression triangle puzzle solution.txt";
        let txt = $("#start").text() + "\n" + $("#log").text();
        var file = new Blob([txt], { type: "text/plain" });
        if (window.navigator.msSaveOrOpenBlob)
          // IE10+
          window.navigator.msSaveOrOpenBlob(file, filename);
        else {
          // Others
          var a = document.createElement("a"),
            url = URL.createObjectURL(file);
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 0);
        }
      }
    });
    let activeAtStart = "";
    let btns = $(".btn-triangle.btn-primary");
    for (const btn of btns) {
      activeAtStart += " " + $(btn).attr("btn-number");
    }

    $("#start").append(`${activeAtStart}`);
    $(this).remove();
  });

  function toggleButton(btn) {
    if (btn.hasClass("btn-primary")) {
      btn.removeClass("btn-primary");
      btn.addClass("btn-secondary");
    } else {
      btn.addClass("btn-primary");
      btn.removeClass("btn-secondary");    }
  }
});
