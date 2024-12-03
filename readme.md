# Salesforce Id Search Extension

A Chrome extension that simplifies searching for Salesforce records by allowing you to quickly navigate to records using the URL bar. Save time by avoiding the need to manually type or remember your org's URL.

## Features

- Quick access to Salesforce records directly from Chrome's URL bar
- Configurable org URL for your Salesforce environment
- Simple keyword trigger ("sf") followed by the `tab` key and then the record ID
- Works with any Salesforce record ID

## Installation

1. Install the extension from the Chrome Web Store [Add store link here]
2. Click on the extension icon in your Chrome toolbar
3. Configure your Salesforce org URL in the options page

## Setup

1. Right-click the extension icon in your Chrome toolbar
2. Select "Options" from the menu
3. Enter your Salesforce org URL (e.g., `https://mycompany.my.salesforce.com`)
4. Click Save

## Usage

1. In Chrome's URL bar, type `sf` and press `Tab`
2. Type or paste your Salesforce record ID (e.g., `001XXXXXXXXXXXXXXX`)
3. Press `Enter` to navigate directly to the record

This will navigate to: `https://mycompany.my.salesforce.com/001XXXXXXXXXXXXXXX`

## Tips

- Works with any Salesforce record ID (Accounts, Contacts, Opportunities, Custom Objects, etc.)
- The extension automatically concatenates your configured org URL with the record ID
- You can update your org URL at any time through the extension options

## Requirements

- Google Chrome browser
- A Salesforce org URL
- Valid Salesforce record IDs

## Known Issues

None currently reported. If you encounter any issues, please submit them in the Issues section of this repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

#### Proudly presented to you by Alamo Industries