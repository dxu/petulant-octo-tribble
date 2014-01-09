PDFJS.getDocument('2.pdf').then(function(pdf) {
  // only show the first 8 pages
  var num_pages = pdf.numPages > 8 ? 8 : pdf.numPages;
  var scale = 1.5;

  // contains all canvas elements
  var pages = [];

  for(var i=0; i < num_pages; i++) {
    // Using promise to fetch the page
    pdf.getPage(i+1).then(function(page) {
      var viewport = page.getViewport(scale);
      // Prepare canvas using PDF page dimensions
      var canvas = document.createElement('canvas');
      canvas.id = 'page' + page.pageNumber;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var context = canvas.getContext('2d');

      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
      pages.push(canvas);
      // append it to the body
      document.body.appendChild(canvas);
    });
  }

});

//43049 everglade park drive.
 // 9:45
