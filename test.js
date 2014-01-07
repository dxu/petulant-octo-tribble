PDFJS.getDocument('book.pdf').then(function(pdf) {
  // only show the first 8 pages
  var num_pages = pdf.numPages > 8 ? 8 : pdf.numPages;
  var scale = 1.5;

  var canvas = document.getElementById('the-canvas');
  var canvasHeight = 0;
  var canvasWidth = 0;

  var pageStarts = [0];
  var pageDatas = [];


  // pages are 1-indexed
  for(var i=1; i <= num_pages; i++) {
    // Using promise to fetch the page
    pdf.getPage(i).then(function(page) {
      var viewport = page.getViewport(scale);
      var context = canvas.getContext('2d');
      // update final canvas
      canvasHeight += viewport.height;
      // width should be the max width so far
      canvasWidth = canvasWidth > viewport.width ? canvasWidth : viewport.width;

      // Prepare canvas using PDF page dimensions
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;

      // Render PDF page into canvas context
      var renderContext = {canvasContext: context,viewport: viewport};
      page.render(renderContext);

      console.log('hello' + page.pageNumber);
      console.log('pagestarts', page.pageNumber, pageStarts[page.pageNumber - 1], viewport.height, page.pageNumber - 1);
      pageStarts.push(pageStarts[page.pageNumber - 1] + viewport.height);
      pageDatas.push(context.getImageData(0, 0, canvas.width, canvas.height));

      console.log('helloboy', num_pages);
      // check if last page, then do final cleanup
      if(page.pageNumber === num_pages) {
        console.log('finished');
        console.log(pageStarts);

        // clear the canvas
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        // regrab the context at the end
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log(pageDatas);
        for (var i = 0; i < pageDatas.length; i++) {
          // context.putImageData(pageDatas[i], 0, pageStarts[i]);
        }
      }
    });
  }

});

//43049 everglade park drive.
 // 9:45
