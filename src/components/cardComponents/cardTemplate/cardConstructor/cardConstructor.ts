// Card Constructor

//Create pokemon card object from input arguments.

class PokemonCardObject {

  name: string;
  imageUrl: string;
  id: number;
  type: string;
  isClicked: boolean;

  constructor(name: string, imageUrl: string, id: number, type: string, isClicked = false) {
    this.validateInputs(name, imageUrl, id, type, isClicked);
    this.name = name;
    this.imageUrl = imageUrl;
    this.id = id;
    this.type = type;
    this.isClicked = isClicked;
  }

  validateInputs(name: string, imageUrl: string, id: number, type: string, isClicked: boolean) {
    if (!name || !imageUrl || id === undefined || !type || isClicked === undefined) {
      throw new Error(
        "Invalid input: all fields (name, imageUrl, id, type, isClicked) are required",
      );
    }

    if (
      typeof name !== "string" ||
      typeof imageUrl !== "string" ||
      typeof type !== "string"
    ) {
      throw new Error(
        "Invalid input: name, imageUrl, and type must be strings",
      );
    }

    if (id < 0) {
      throw new Error("Invalid input: id must be a positive number");
    }
  }

  toggleClick() {
    this.isClicked = !this.isClicked;
  }
}
export default PokemonCardObject;
