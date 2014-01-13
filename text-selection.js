
window.onload = function () {

    var scale = 1.5; //Set this to whatever you want. This is basically the "zoom" factor for the PDF.

    function loadPdf(pdfPath) {
        var pdf = PDFJS.getDocument(pdfPath);
        pdf.then(renderPdf);
    }

    function renderPdf(pdf) {
        pdf.getPage(1).then(renderPage);
    }

    function renderPage(page) {
        var viewport = page.getViewport(scale);
        var $canvas = jQuery("<canvas></canvas>");

        //Set the canvas height and width to the height and width of the viewport
        var canvas = $canvas.get(0);
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        //Append the canvas to the pdf container div
        var $pdfContainer = jQuery("#pdfContainer");
        $pdfContainer.css("height", canvas.height + "px").css("width", canvas.width + "px");
        $pdfContainer.append($canvas);

        var canvasOffset = $canvas.offset();
        var $textLayerDiv = jQuery("<div />")
            .addClass("textLayer")
            .offset({
                top: canvasOffset.top,
                left: canvasOffset.left
            });

        //The following few lines of code set up scaling on the context if we are on a HiDPI display
        var outputScale = getOutputScale(context);
        if (outputScale.scaled) {
            var cssScale = 'scale(' + (1 / outputScale.sx) + ', ' +
                (1 / outputScale.sy) + ')';
            CustomStyle.setProp('transform', canvas, cssScale);
            CustomStyle.setProp('transformOrigin', canvas, '0% 0%');

            if ($textLayerDiv.get(0)) {
                CustomStyle.setProp('transform', $textLayerDiv.get(0), cssScale);
                CustomStyle.setProp('transformOrigin', $textLayerDiv.get(0), '0% 0%');
            }
        }

        context._scaleX = outputScale.sx;
        context._scaleY = outputScale.sy;
        if (outputScale.scaled) {
          console.log(outputScale, 'hi');
          canvas.width *= outputScale.sx;
          canvas.height *= outputScale.sy;
            context.scale(outputScale.sx, outputScale.sy);
        }
        // set textlayerdiv width/height
        $textLayerDiv.css("height", canvas.height + "px")
          .css("width", canvas.width + "px")

        $pdfContainer.append($textLayerDiv);

        page.getTextContent().then(function (textContent) {

            var textLayer = new TextLayerBuilder({
                textLayerDiv: $textLayerDiv.get(0),
                pageIndex: 0
            });

            textLayer.setTextContent(textContent);

            var renderContext = {
                canvasContext: context,
                viewport: viewport,
                textLayer: textLayer
            };

            page.render(renderContext);
        });
    }

    loadPdf('2.pdf');
};


