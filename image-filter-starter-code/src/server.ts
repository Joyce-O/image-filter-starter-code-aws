import express from 'express';
const http = require('http');
import bodyParser from 'body-parser';
const imageType = require('image-type');
import { filterImageFromURL, deleteLocalFiles, getAllFilePaths } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
    // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get("/filteredimage", async (req, res) => {
    try {
      let imageUrl = req.query.image_url;
      if (!imageUrl) {
        return res.send("This endpoint requires image_url as a query");
      } else {
        imageUrl = imageUrl.trim();
        const resultFile = await filterImageFromURL(imageUrl);
        if (typeof resultFile === 'object') {
          return res.status(400).send({ mesg: "Make sure the provided image_url is a valid image file", error: resultFile });
        }
        const fileList = await getAllFilePaths();
        await deleteLocalFiles(fileList)
        return res.send(resultFile);
      }
    } catch (error) {
      return res.status(400).send({ mesg: "Make sure the provided image_url is a valid image file", error });
    }
  });

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();