# Earthquake Monitor

Earthquake monitor is a Web Application that lists the latest earthquakes.

![General View](</screenshots/MainVideo.gif>)

## Setup

Requirements:

- Node v22.X.X
- Git

Running the project in development environment:

- Clone the repository:
```bash
    git clone https://github.com/PatriciaFontenelle/earthquake-monitor.git
```
- Install dependencies:
```bash 
    npm install
```
- Run the application:
```bash
    npm run dev
```
- Expected terminal response: <br /><br />
![Terminal](<./screenshots/Terminal.png>)

- CTRL + click the localhost link to open it on your browser.

Or access it on production environment:
https://patriciafontenelle.github.io/earthquake-monitor/

## Notes on design decisions
- List and map side by side in order to allow simultanious visualization and comparison;
- Tooltip on map markers for easiar comprehension of which data it represents;
- Hidden filters to allow better visualization of the map and avoid interface polution;
- Automatic color pallete adaption to the device's theme.
- On mobile:
    - Map taking the whole screen for easier visualization;
    - List hidden on a side menu to keep the interface clean and intuitive;

    | Light Theme | Dark Theme |
    |-------------------------------------------|-------------------------------------------|
    | ![Terminal](<./screenshots/LightTheme.png>) | ![Terminal](<./screenshots/DarkTheme.png>) |  

## Assumptions and limitations
- Limitation:
    - The plaform doesn't provide a websocket API nor a webhook method that would allow the application to recieve data in realtime;
    - The GeoJSON component provided by React Leaflet component does not rerendered when state is changed, so when the data is updated, the map doesn't reflect the changes;
    - When zooming in on the map, the marker doesn't change size immediatly, so it takes the whole screen for a second as it shows on the first gif in this page;
- Assumptions:
    - Data is fetched every 2 minutes, which I assumed is a short enough interval to give the sansation that the data is fetched in realtime while keeping the amount of requests acceptable;
    - I replaced de GeoJSON component by using a map function on the data array and rendering a marker component for each one of the items. Though I did find a workaround for the GeoJSON problem by forcing the component to rerender, I felt like the code would look cleaner and it would be safer to replace it with the individuals markers. 

## Implemented bonus
- Accessibility:
    - Color contrast;
    - Keyboard navigation;
    - Alt attribute on logo;
- Handle large datasets:
    - Limit API results to 50 items;
    - Use detailed filters to allow the users to search for more specific data without having to exceed the results limit;

    | Keyboard Navigation            | Filters &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
    | ------------------------------ | ------------------------------------------ |
    | ![Filters](</screenshots/Filters.gif>) | ![Accessibility](/screenshots/Accessibility.gif)|

## Used technologies
- API: USGS Earthquake Catalog. Learn more about it [here](https://earthquake.usgs.gov/fdsnws/event/1/).
- Development:
    - ReactJS as the frontend framework;
    - Vite as a build tool;
    - Tailwind to simplify styling;
    - DaisyUI for components;
    - Leaflet for map rendering;
