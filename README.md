# Dungeon Alchemist Post Processor

This is a NodeJS project for processing outputs from Dungeon Alchemist.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/dungeon-alchemist-post-processor.git
```

2. Navigate to the project directory:

```sh
cd dungeon-alchemist-post-processor
```

3. Install the dependencies:

```sh
npm install
```

### Usage

To run the transformation, use the following command:

```sh
npm start process {Foundry JSON file exported from Dungeon Alchemist}
```

### Results

#### Windows

Windows are set with Light and Sight Restriction set to Proximity with a default
distance of 10 feet, and Proximity Threshold Attenuation is enabled. Windows are detected
as being exactly 1 or 2 grid squares, having no sense restrictions.

#### Fences

Fences are set with Light and Sight Restriction set to Limited instead of None.
Fences are detected as being greater than 2 grid squares, having no sense restrictions. A
fence that is exactly 1 or 2 grid squares will erroneously be detected as a window.

#### Gates

Gates are set with Light and Sight Restriction set to Limited instead of None.
Gates are detected as being exactly 1 or 2 grid squares and attached to a known Fence. A
Gate that is attached to a Fence that is mistaken for a Window will not be updated.

The specifics for how objects are detected are documented in the various Filter classes. Note
that the results can be imprecise due to the limitations of the source data. Assumptions are
made that windows and doors cannot be more than two grid unit wide. However, the cleanup
should be considerably less effort than updating everything by hand every time the Dungeon
Alchemist JSON is imported.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request.

### License

This project is licensed under the MIT License.

### Contact

For any questions or feedback, please contact [sfergus1@gmail.com](mailto:sfergus1@gmail.com).
