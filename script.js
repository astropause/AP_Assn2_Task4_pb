require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/ImageryLayer",
  "esri/layers/support/RasterFunction"
], (Map, MapView, ImageryLayer, RasterFunction) => { 
  const imagePopupTemplate = {
    title: "Data from Landsat 8 satellite",
    content: `
      Rendered RGB values: <b>{Raster.ServicePixelValue} </b>
      <br>Original values (B, G, R, NIR): <b>{Raster.ItemPixelValue} </b>
      `,
  };

  const landsatRFT = new RasterFunction({
    functionName: "NDVI",
    variableName: "Raster",
  });

  const layer = new ImageryLayer({
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    rasterFunction: landsatRFT,
    popupTemplate: imagePopupTemplate,
  });

  const map = new Map({
    basemap: "hybrid",
    layers: [layer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: {
      x: -92.4604,
      y: 42.5246,
      spatialReference: 4326
    },
    zoom: 6,
    popup: {
      actions: []
    }
  });
});