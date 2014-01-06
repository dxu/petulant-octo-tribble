PDFJS.getDocument('book.pdf').then(function(pdf) {
  // only show the first 8 pages
  var num_pages = pdf.numPages > 8 ? 8 : pdf.numPages;
  var scale = 1.5;

  var canvas = document.getElementById('the-canvas');
  var context = canvas.getContext('2d');
  var canvasHeight = 0;
  var canvasWidth = 0;

  var pageStarts = [];


  for(var i=0; i < num_pages; i++) {
    // Using promise to fetch the page
    pdf.getPage(1).then(function(page) {
      var viewport = page.getViewport(scale);
      //
      // Prepare canvas using PDF page dimensions
      //
      canvasHeight += viewport.height;
      canvasWidth += viewport.width;


      //
      // Render PDF page into canvas context
      //
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });

  }


    canvas.height = viewport.height;
    canvas.width = viewport.width;
});

//43049 everglade park drive.
 // 9:45
