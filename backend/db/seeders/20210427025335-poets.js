"use strict";
const authors = [
  "Adam Lindsay Gordon",
  "Alan Seeger",
  "Alexander Pope",
  "Algernon Charles Swinburne",
  "Ambrose Bierce",
  "Amy Levy",
  "Andrew Marvell",
  "Ann Taylor",
  "Anne Bradstreet",
  "Anne Bronte",
  "Anne Killigrew",
  "Anne Kingsmill Finch",
  "Annie Louisa Walker",
  "Arthur Hugh Clough",
  "Ben Jonson",
  "Charles Kingsley",
  "Charles Sorley",
  "Charlotte Bronte",
  "Charlotte Smith",
  "Christina Rossetti",
  "Christopher Marlowe",
  "Christopher Smart",
  "Coventry Patmore",
  "Edgar Allan Poe",
  "Edmund Spenser",
  "Edward Fitzgerald",
  "Edward Lear",
  "Edward Taylor",
  "Edward Thomas",
  "Eliza Cook",
  "Elizabeth Barrett Browning",
  "Emily Bronte",
  "Emily Dickinson",
  "Emma Lazarus",
  "Ernest Dowson",
  "Eugene Field",
  "Francis Thompson",
  "Geoffrey Chaucer",
  "George Eliot",
  "George Gordon, Lord Byron",
  "George Herbert",
  "George Meredith",
  "Gerard Manley Hopkins",
  "Helen Hunt Jackson",
  "Henry David Thoreau",
  "Henry Vaughan",
  "Henry Wadsworth Longfellow",
  "Hugh Henry Brackenridge",
  "Isaac Watts",
  "James Henry Leigh Hunt",
  "James Thomson",
  "James Whitcomb Riley",
  "Jane Austen",
  "Jane Taylor",
  "John Clare",
  "John Donne",
  "John Dryden",
  "John Greenleaf Whittier",
  "John Keats",
  "John McCrae",
  "John Milton",
  "John Trumbull",
  "John Wilmot",
  "Jonathan Swift",
  "Joseph Warton",
  "Joyce Kilmer",
  "Julia Ward Howe",
  "Jupiter Hammon",
  "Katherine Philips",
  "Lady Mary Chudleigh",
  "Lewis Carroll",
  "Lord Alfred Tennyson",
  "Louisa May Alcott",
  "Major Henry Livingston, Jr.",
  "Mark Twain",
  "Mary Elizabeth Coleridge",
  "Matthew Arnold",
  "Matthew Prior",
  "Michael Drayton",
  "Oliver Goldsmith",
  "Oliver Wendell Holmes",
  "Oscar Wilde",
  "Paul Laurence Dunbar",
  "Percy Bysshe Shelley",
  "Philip Freneau",
  "Phillis Wheatley",
  "Ralph Waldo Emerson",
  "Richard Crashaw",
  "Richard Lovelace",
  "Robert Browning",
  "Robert Burns",
  "Robert Herrick",
  "Robert Louis Stevenson",
  "Robert Southey",
  "Robinson",
  "Rupert Brooke",
  "Samuel Coleridge",
  "Samuel Johnson",
  "Sarah Flower Adams",
  "Sidney Lanier",
  "Sir John Suckling",
  "Sir Philip Sidney",
  "Sir Thomas Wyatt",
  "Sir Walter Raleigh",
  "Sir Walter Scott",
  "Stephen Crane",
  "Thomas Campbell",
  "Thomas Chatterton",
  "Thomas Flatman",
  "Thomas Gray",
  "Thomas Hood",
  "Thomas Moore",
  "Thomas Warton",
  "Walt Whitman",
  "Walter Savage Landor",
  "Wilfred Owen",
  "William Allingham",
  "William Barnes",
  "William Blake",
  "William Browne",
  "William Cowper",
  "William Cullen Bryant",
  "William Ernest Henley",
  "William Lisle Bowles",
  "William Morris",
  "William Shakespeare",
  "William Topaz McGonagall",
  "William Vaughn Moody",
  "William Wordsworth",
];

const images = [
  "https://images.genius.com/dec8315c0177ec45f2f4a035b4e5dffd.859x859x1.jpg",
  "https://images.genius.com/09100a274793ff20f8712aeb704f12ca.591x591x1.jpg",
  "https://images.genius.com/8f9k1t3oqd2h4bc74ocz0xhix.805x1000x1.jpg",
  "https://images.genius.com/c22925221faec7c8fe2af694cf059169.654x915x1.jpg",
  "https://images.genius.com/bbad086d64620052395a6023fe9ade75.307x400x1.gif",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/097c8ef7efc19abd8c87fa7942f25258.220x270x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://s3.amazonaws.com/rapgenius/1380126223_anne-bradstreet.jpg",
  "https://images.genius.com/4b507554015f2e5aaf971aacc92cc658.688x1000x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/def97280675e0e5ff33324e08d559e04.200x200x1.jpg",
  "https://images.genius.com/551f34f737e7d4d8a1da54ac1cd13b88.600x600x1.jpg",
  "https://s3.amazonaws.com/rapgenius/531px-Benjamin_Jonson_by_Abraham_van_Blyenberch.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/8b4e56786de55c1bb5f5f4d9d47ed76c.292x292x1.jpg",
  "https://images.genius.com/f6ccc9405cee1025b9f30b4208813cc9.200x286x1.png",
  "https://images.genius.com/826aa9f430e043cf6ed44be75be2040d.300x200x1.jpg",
  "https://images.genius.com/bpk1nd7rp4fo40edfioojk31l.457x581x1.jpg",
  "https://images.genius.com/8104v50548m3e3f4efbxzzex7.811x1000x1.jpg",
  "https://images.genius.com/ba7382691f5cf10928cddcdf4ed16dfa.430x430x1.jpg",
  "https://images.genius.com/fe657c3a0cca9f08ef9d94889317a4df.345x345x1.jpg",
  "https://s3.amazonaws.com/rapgenius/Edgar_Allan_Poe_portrait_B.jpg",
  "https://images.genius.com/91590826956ea4dda680c96413e3abfb.495x586x1.jpg",
  "https://s3.amazonaws.com/rapgenius/220px-Edward_FitzGerald.jpg",
  "https://images.genius.com/700f9248bea47a050c3bcaae1ec77e0d.460x276x1.jpg",
  "https://s3.amazonaws.com/rapgenius/8901_b_7246.jpg",
  "https://images.genius.com/8db3d462dc52f4686ca3e2a29d763770.264x350x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/030bbfda283eaf8de90f5b51fd6ae4f0.306x400x1.jpg",
  "https://images.genius.com/53c46c2da726b75932d42b0073fc7772.236x236x1.jpg",
  "https://images.genius.com/a03142dcd02179c6d14f3d179d24a89b.975x975x1.jpg",
  "https://s3.amazonaws.com/rapgenius/Emma_Lazarus.jpg",
  "https://images.genius.com/ca94a92fef760c2d48e4f81b0ace8928.825x825x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://s3.amazonaws.com/rapgenius/arts-graphics-2008_1184459a.jpg",
  "https://images.genius.com/fcafe0d84fc4d57736e61dbfd4ce7906.538x531x1.jpg",
  "https://images.genius.com/664d3a73abe0cfb58dfef49c33e53c53.416x550x1.jpg",
  "https://images.genius.com/7cade7d6637415841158d35c20e81750.416x521x1.jpg",
  "https://images.genius.com/5ca0ab1c633b1a13dbe79680c2ace558.150x150x1.jpg",
  "https://images.genius.com/9337662e3643e3392fc9a6f4ba6224f9.220x295x1.jpg",
  "https://images.genius.com/d0fdbeac54e19121237527423520cbf2.295x405x1.jpg",
  "https://s3.amazonaws.com/rapgenius/230px-Benjamin_D._Maxham_-_Henry_David_Thoreau_-_Restored.jpg",
  "https://images.genius.com/042207d2670850a447928618493e9ac5.140x140x1.jpg",
  "https://s3.amazonaws.com/rapgenius/henry-wadsworth-longfellow-1.jpg",
  "https://images.genius.com/be290406c4e2507538172642b7b8f8bd.1000x667x1.jpg",
  "https://images.genius.com/008a1181bccbca62fbe7304661f70bc6.949x949x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/70223856e54510192a8167777ee52d84.574x574x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://s3.amazonaws.com/rapgenius/1369412648_Jane-Austen-9192819-1-402.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/25bce966b91075eec947250c209d8e94.640x783x1.jpg",
  "https://s3.amazonaws.com/rapgenius/donne01.JPG",
  "https://images.genius.com/3fc2c89de8e2231f601ae01fcb1610a7.293x293x1.jpg",
  "https://images.genius.com/1b7fc02051fb4b8d6db50a1b3de40f27.220x220x1.jpg",
  "https://s3.amazonaws.com/rapgenius/200px-John_Keats_by_William_Hilton.jpg",
  "https://images.genius.com/1391fd312db388aeb14bfa7bd067aad3.422x599x1.jpg",
  "https://s3.amazonaws.com/rapgenius/miltonportrait2.jpg",
  "https://images.genius.com/f5cecb403364fda3cf9cee95e2fec842.1000x667x1.jpg",
  "https://images.genius.com/088558e4b5d5ee6f6621f563e32184b5.329x384x1.jpg",
  "https://images.genius.com/e82d3aa8120d5cc12c545033d4c45bf2.889x1000x1.jpg",
  "https://images.genius.com/6f1e66b5da6bb21cceee3cee5fb5dab5.272x272x1.jpg",
  "https://images.genius.com/ef4684487a7c9c12ac307fd6cc09f63b.350x350x1.png",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/5803b7e46c039d82b0aa21ebffc2d0a3.320x320x1.jpg",
  "https://images.genius.com/1c0fd27155031534047ee59cd0e2e4ac.1000x1000x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://s3.amazonaws.com/rapgenius/1361467849_Lewis-Carroll-teal.jpg",
  "https://s3.amazonaws.com/rapgenius/Alfred-Lord-Tennyson.jpg",
  "https://images.genius.com/61bfc98057380388b5b58937a4cc5e8b.1000x1000x1.jpg",
  "https://images.genius.com/aceaf67cb2f9db8f8306244c88f847d6.600x400x1.jpg",
  "https://images.genius.com/eb60329fb4c6a7c7fb982a0c4c1b3380.723x1000x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/e51c96a66c39280b211beec56add2817.592x751x1.jpg",
  "https://images.genius.com/8d9fc57525ab2052e6e3db981cf1039a.724x724x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/0e6f0c5eb3e3d6c65c922f6211c55972.375x512x1.jpg",
  "https://images.genius.com/258446adc2896bdd435158439efcda7e.200x245x1.jpg",
  "https://s3.amazonaws.com/rapgenius/1378768348_Oscar_Wilde_portrait.jpg",
  "https://images.genius.com/835f5d2d9f1d0994290f5753d525be3b.220x254x1.jpg",
  "https://images.genius.com/2052wxylmtcfa36y9jqhdci2.723x1000x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/78a8ac6a877cd3a2e83fea1101f088e1.427x491x1.jpg",
  "https://s3.amazonaws.com/rapgenius/ralph-waldo-emerson-448.jpg",
  "https://images.genius.com/47f8a2383e49dbd877532276573cf419.197x197x1.jpg",
  "https://s3.amazonaws.com/rapgenius/1373755920_200px-RichardLovelace.jpg",
  "https://s3.amazonaws.com/rapgenius/marks_main2_2162312b.jpg",
  "https://images.genius.com/3p1b6jiadfjagsnwhz5n0f911.320x292x1.jpg",
  "https://s3.amazonaws.com/rapgenius/Robert_Herrick_1591-1674.jpg",
  "https://images.genius.com/f7cba2dd0f1287401143a4f7cc359862.461x661x1.jpg",
  "https://images.genius.com/ebe3b008c6ab40d6da13744cf211ba8b.170x170x1.jpg",
  "https://images.genius.com/67238ec42a2fb4d563962126d9712b5e.1000x1000x1.jpg",
  "https://images.genius.com/3417194fca4102257592d799cb6db49d.320x320x1.jpg",
  "https://images.genius.com/901f9cf56687a5709e2620dc2429d2bc.398x398x1.jpg",
  "https://images.genius.com/dc817861006b41f53b3f26888e862377.1000x1000x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/c8bb27e48916e1f35c537485fe69188d.300x300x1.jpg",
  "https://images.genius.com/187041b0d4ed088bdd8ec1cd8cfc32b4.713x1000x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://images.genius.com/afbaa03fc60d61526ff467cf170e22cc.910x1000x1.png",
  "https://images.genius.com/4e2c6e965cd0850b2dc5e08d31aafb5b.377x377x1.png",
  "https://images.genius.com/d38ed81ea3a936ef4614b932a87c2b1d.469x469x1.png",
  "https://images.genius.com/937899817bbca48d3fbf47a8d864ae81.807x807x1.jpg",
  "https://images.genius.com/e489fe26dfac317a07aa887d636434fe.347x347x1.jpg",
  "https://images.genius.com/bd862945ba292d1c6227de9c9e22e742.1000x1000x1.jpg",
  "https://images.genius.com/ec8cfcf964399fd9b55ca22d3f2fd347.401x500x1.jpg",
  "https://images.genius.com/0a8052530b8d5aa05a38f6bb942aeea8.300x300x1.jpg",
  "https://images.genius.com/8c4b300d16488155a24c238b1dcfde37.220x284x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://s3.amazonaws.com/rapgenius/walt-whitman-1.jpg",
  "https://images.genius.com/55575ff485006e2e1521bdb743ed01f0.293x293x1.jpg",
  "https://images.genius.com/74be1bfca2a29ee54e65c4fc2fb11833.491x491x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://i.imgur.com/LaLkhiv.jpg",
  "https://s3.amazonaws.com/rapgenius/williamblakeportrait.jpg",
  "https://images.genius.com/bcae92b71104863eb71c7a865c787f89.997x1000x1.jpg",
  "https://images.genius.com/616364d213fb4bd0534346939b9d665d.249x249x1.jpg",
  "https://images.genius.com/a140d18c72bb2f9a6d9b39a1175c5bdb.1000x1000x1.jpg",
  "https://images.genius.com/5a007748a88450fb90f580a3feb62859.1000x1000x1.jpg",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://assets.genius.com/images/default_avatar_300.png?1618862777",
  "https://s3.amazonaws.com/rapgenius/1339525533_250px-Shakespeare.jpg",
  "https://images.genius.com/219dc8c64b3752e7e8324d9de1d69ce3.450x450x1.jpg",
  "https://s3.amazonaws.com/rapgenius/1380828355_WEB_DuBois_1918.jpg",
  "https://s3.amazonaws.com/rapgenius/cbr_wot_grmdc_a10_large.jpg",
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    let poets = [];

    for (let i = 0; i < authors.length; i++) {
      let newPoet = {
        name: authors[i],
        picture: images[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      poets.push(newPoet)
    }
    return queryInterface.bulkInsert("Poets", poets, {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Poets', null, {});
  },
};
