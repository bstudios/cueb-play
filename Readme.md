# CueB Play

Pronounced `kyo͞ob plā` (cube play), CueB Play is a Sound and Video playback platform for Theatre & Live Events written in [Typescript](https://www.typescriptlang.org/).

## Installation

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed. From your command line:

```bash
# Install dependencies
npm install
# Run the app
npm start
```

## Usage

To package the app for distribution, run the following command from your command line:

```bash
npm run make
```

When using the TypeORM cli be sure to prefix with `npm run` e.g:

```bash
npm run typeorm migration:generate -n src/database/migration/example
```

## Contributing

Pull requests are welcome - feel free to open an issue as well.

## Stack

 - [Electron](https://github.com/electron/electron)
 - Framework: [React](https://github.com/facebook/react)
 - Styling: [TailwindCSS](https://github.com/tailwindlabs/tailwindcss)
 - Logging: [Winston](https://github.com/winstonjs/winston)
 - ORM: [Typeorm](https://github.com/typeorm/typeorm) 
 - Database: [Sqlite3](https://sqlite.org)
 - Audio Playback: [Howler.js](https://github.com/goldfire/howler.js)

## License

```
CueB Play is a Sound and Video playback platform for Theatre & Live Events
Copyright (C) 2022 Bithell Studios Ltd

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```