# WEB103 Project 4 - *Velocraft Garage*

Submitted by: **Rajeev Atla**

About this web app: **Velocraft Garage is a React, Express, and Supabase bike customizer where users can configure a custom bike build, see the live visual and price updates, save the build to PostgreSQL, and then review, edit, or delete saved bikes.**

Time spent: **TBD** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
- [x] **NOTE: The walkthrough should include a view of the Supabase dashboard showing that the Postgres database is available.**
- [x] **NOTE: The walkthrough should include a demonstration of the table contents, for example from the Supabase Table Editor or SQL Editor using `SELECT * FROM custom_items;`.**
- [x] **Users can view multiple features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**

The following **optional** features are implemented:

- [x] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [x] A custom SVG bike preview changes shape and accessories based on the selected configuration
- [x] Shared pricing and validation utilities are reused across create and edit flows
- [x] The interface uses a distinctive workshop/editorial design direction instead of the starter layout

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ... **ScreenToGif**
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

- The original starter repo was structured like a venue and events app, so the project required a full frontend rewrite to align with the Project 4 custom item requirements.
- Supabase was used in place of Render + a custom Express CRUD backend, so the README notes referencing Render were adapted to the equivalent Supabase workflow.
- The final architecture uses an Express API layer backed by Supabase Postgres so it still aligns with the assignment's intended client/server split.

## License

Copyright [2026] [Rajeev Atla]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
