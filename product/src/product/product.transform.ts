export const transformProduct = (products: any[] ) => {
  return products.map(e => {
    return {
      id: e.id,
      code: e.code,
      type: e.type,
      rarity: e.rarity,
      box: e.box,
      releaseDate: e.releaseDate,
      name: e.name,
      text: e.text,
      attribute: e.attribute,
      level: e.level,
      atk: e.atk,
      def: e.def,
      image: e.image
    }
  })
}