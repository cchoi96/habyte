// const categories = [
//   {
//     name: "farm",
//     img: "/assets/other/farm.png"
//   },
//   {
//     name: "coding",
//     img: "/assets/other/coding_icon.png"
//   },
//   {
//     name: "health",
//     img: "/assets/other/health_icon.png"
//   }
// ];

// const [categoryList, setCategoryList] = useState(categories);

// let totalCategoryList = categoryList.map((category, index) => {
//   return (
//     <StyledCategoryListItem
//       key={category.name}
//       index={index}
//       categoryName={category.name}
//       categoryImg={category.img}
//       setMode={setMode}
//     ></StyledCategoryListItem>
//   );
// });

// const StyledCategoryListItem = styled(CategoryListItem)`
//   width: 90%;
//   margin: 10px auto;
//   list-style-type: none;
//   text-align: center;
//   padding: 10px 0 20px 0;
//   border-radius: 10px;
//   min-height: 100px;
//   height: 20%;
//   .projectName {
//     font-size: 1.5em;
//   }
//   b .projectStatus {
//     font-size: 1.5em;
//   }

//   p {
//     margin: 0;
//   }

//   img {
//     margin: 5px;
//     width: 50px;
//   }
//   box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
//     0 1px 4px 0 rgba(26, 24, 29, 0.12);
//   &:hover {
//     cursor: pointer;
//     background-color: ${props =>
//       props.categoryName === "coding"
//         ? "rgba(67, 40, 116, 1)"
//         : props.categoryName === "health"
//         ? "rgba(247, 78, 82, 1)"
//         : "rgba(36, 204, 143, 1)"};
//   }

//   color: #fff;

//   background-color: ${props =>
//     props.categoryName === "coding"
//       ? "rgba(67, 40, 116, 0.85)"
//       : props.categoryName === "health"
//       ? "rgba(247, 78, 82, 0.85)"
//       : "rgba(36, 204, 143, 0.85)"};

//   @media only screen and (max-width: 950px) {
//     width: 15vw;
//     height: 8vw;
//     min-width: 60px;
//     min-height: 60px;
//     display: inline-block;
//     img {
//       margin: 0;
//       width: 40%;
//       min-width: 40px;
//     }
//     p {
//       display: none;
//     }
//   }
// `;