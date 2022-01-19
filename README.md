# ImageProcessingAPI

## About

An API that allows you to to place images into your frontend with the size set via URL parameters for rapid prototyping. It is also serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API will handle resizing and serving stored images for you.

### Installing

Install all npm packages require using

```
npm install
```

To build the application run the command

```
npm run build
```

To test the api run the command

```
npm run test
```

Start the api server:

```
npm run start
```

## API description

The available images to scale is existed in:

```
./assets/full
```

Retreive the image with the size set via URL parameters:

```
http://localhost:3000/api/images?fileName=[fileName]&width=[width]&height=[height]
Example: http://localhost:3000/api/images?fileName=fjord&width=699&height=209
```
