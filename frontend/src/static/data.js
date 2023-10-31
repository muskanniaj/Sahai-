// navigation Data
export const navItems = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Best Cause",
      url: "/best-cause",
    },
    {
      title: "Drives",
      url: "/drives",
    },
  ];
  
  // branding data
  export const brandingData = [

  ];
  
  // categories data
  export const categoriesData = [
    {
      id: 1,
      title: "Healthcare",
      subTitle: "",
      image_Url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY-eNk7VwjUhLxlkl2ahRoL8oCohxgv6Fr7Q&usqp=CAU",
    },
    {
      id: 2,
      title: "Orphanages",
      subTitle: "",
      image_Url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaQSgZ_ijgtRWySNomoQPKL0HsUQze9Dxukg&usqp=CAU",
    },
    {
      id: 3,
      title: "Old Age Home",
      subTitle: "",
      image_Url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkNgvuWbO2dO6q8c4pqvAhgQNixf7rlEqSQ&usqp=CAU",
    },
    {
      id: 4,
      title: "Defence Bravehearts",
      subTitle: "",
      image_Url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4o_asXZplRPSYF-DVHfERUly0tspKPaquw&usqp=CAU",
    },
    {
      id: 5,
      title: "Others",
      subTitle: "",
      image_Url:
        "https://st2.depositphotos.com/1364916/6359/v/600/depositphotos_63590421-stock-illustration-happy-and-optimistic-people-logo.jpg",
    },

  ];
  
  // drive Data
  export const driveData = [
    {
      id: 1,
      category:"Helathcare",
      name: "Pradhan Mantri Jeevan Saral Yojna",
      description:
        "Healthcare",
      image_Url: [
        {
          public_id: "test",
          url: "https://m.economictimes.com/photo/88966321.cms",
        },
        {
          public_id: "test",
          url: "https://m.economictimes.com/photo/88966321.cms",
        },
      ],
      charity: {
        name: "Random. Name",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      price: 1099,
      discount_price: 1049,
      rating: 4,
      total_sell: 35,
      stock: 10,
    },
    {
      id: 2,
      category:"Orphanages",
      name: "Child Line ",
      description:
        "Orphanages",
      image_Url: [
        {
          public_id: "test",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaQSgZ_ijgtRWySNomoQPKL0HsUQze9Dxukg&usqp=CAU",
        },
        {
          public_id: "test",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaQSgZ_ijgtRWySNomoQPKL0HsUQze9Dxukg&usqp=CAU",
        },
      ],
      charity: {
        name: "Random. Name",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      discount_price: 1099,
      rating: 5,
      total_sell: 80,
      stock: 10,
      category:"Orphanages"
    },
    {
      id: 3,
      category:"Old Age Home",
      name: "National Old Age Home Scheme",
      description:
        "Old Age Home",
      image_Url: [
        {
          public_id: "test",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkNgvuWbO2dO6q8c4pqvAhgQNixf7rlEqSQ&usqp=CAU",
        },
        {
          public_id: "test",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkNgvuWbO2dO6q8c4pqvAhgQNixf7rlEqSQ&usqp=CAU",
        },
      ],
      charity: {
        name: "Random. Name",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
    },
      price: 1099,
      discount_price: 1049,
      rating: 4,
      total_sell: 75,
      stock: 10,
      category:"Old Age Home"
    },
    {
      id: 4,
      category:"Defense Bravehearts",
      name: "Jawaan Rakshak",
      description:
        "Defense Bravehearts",
      image_Url: [
        {
          public_id: "test",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4o_asXZplRPSYF-DVHfERUly0tspKPaquw&usqp=CAU",
        },
        {
          public_id: "test",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4o_asXZplRPSYF-DVHfERUly0tspKPaquw&usqp=CAU",
        },
      ],
      charity: {
        name: "Random. Name",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      category:"Defense Bravehearts"
      },
      price: 100,
      discount_price: 79,
      rating: 4,
      total_sell: 12,
      stock: 10,
    },
    {
      id: 5,
      category:"Others",
      name: "Just like other few organisations and policies",
      description:
        "Others",
      image_Url: [
        {
          public_id: "test",
          url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEX///8AAAA/Pz+/v79/f38PDw/v7+/f399fX1+fn58vLy/Pz8+vr68fHx9vb29PT0+Pj480/a1MAAACz0lEQVR4nO3Y2WKqMBiFUcnEKPr+T1skM8FzKgF7860rGiw/O4QQuN0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECd8dkJIea+vapAK6VUapKy3DWpx1JbPU+o3d8bT0y+sdkjlh1i3YpnZPesm7L4B7Uef0hahjk9Y6N03NPXxRiHrLQwpwdRm8bZhBx57UdVDr0po8ergzSD2c3RzGfmWJKYq4M0g/3XedM8Hs9h7kURe7rXBrHtZtN4P54j1NCzlFPnj/i664TlLr77a/5NEC2iPhYRauHH0nrOvd0eJrPMarOuGVmtO64btH6cJV0jk/O0/htE7PeWykq8pq45bt5eE1jFyFJZjjiDhUn49CD+gDIcqWqq8uwdosN06Mt01wVxv1fhSMMJOdomKxFPU38lyLzttcP6bJDuNp0exMTB+7Sbzb3yke4rZLNe2+Tn+S7IVvrjSJZBurinDc8wPdettLqdHrRHDn10bhAzPdyZrzueyU+7mih704ZOu+/MIBl3XzySJl0xwER+0ntt1wTx86TJFimduR30V1dEx0fflK6R8i79QMU9MoRVSBEkWaKMu0FEdjtMsWf00fvEVtBp05h25T+CfD79BsXasO389HX0kfLV54gIS8ZyBLWPNxl/aSwPfOmT3dXbee8wuqjzkW+vtdyDo/hFGH5Hg7jZL65+Xcdctvp1c1T5yJjqgoT3EXtPTJe/j7jD3W3PdfFxLoo6n/Evhbrr5TM8Z5MOOxAkfUNcXxHTtZarYf9Y+m1QcuGn4ONLelN+e8i79ECQjNoEcWNgvS2n3V8f9PYrykVB/BhI3keSyjULx3ffta4KklyS4gtO3XvJmy+NVwXxl6S/me2qrfr9Kvk2K7Zfmc8P4i7Ja2aMH6CayhcSr+1VJzo1HV5HHzY+l8rL6kV+vzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVPoBCJ0UotLu1agAAAAASUVORK5CYII=",
        },
        {
          public_id: "test",
          url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEX///8AAAA/Pz+/v79/f38PDw/v7+/f399fX1+fn58vLy/Pz8+vr68fHx9vb29PT0+Pj480/a1MAAACz0lEQVR4nO3Y2WKqMBiFUcnEKPr+T1skM8FzKgF7860rGiw/O4QQuN0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECd8dkJIea+vapAK6VUapKy3DWpx1JbPU+o3d8bT0y+sdkjlh1i3YpnZPesm7L4B7Uef0hahjk9Y6N03NPXxRiHrLQwpwdRm8bZhBx57UdVDr0po8ergzSD2c3RzGfmWJKYq4M0g/3XedM8Hs9h7kURe7rXBrHtZtN4P54j1NCzlFPnj/i664TlLr77a/5NEC2iPhYRauHH0nrOvd0eJrPMarOuGVmtO64btH6cJV0jk/O0/htE7PeWykq8pq45bt5eE1jFyFJZjjiDhUn49CD+gDIcqWqq8uwdosN06Mt01wVxv1fhSMMJOdomKxFPU38lyLzttcP6bJDuNp0exMTB+7Sbzb3yke4rZLNe2+Tn+S7IVvrjSJZBurinDc8wPdettLqdHrRHDn10bhAzPdyZrzueyU+7mih704ZOu+/MIBl3XzySJl0xwER+0ntt1wTx86TJFimduR30V1dEx0fflK6R8i79QMU9MoRVSBEkWaKMu0FEdjtMsWf00fvEVtBp05h25T+CfD79BsXasO389HX0kfLV54gIS8ZyBLWPNxl/aSwPfOmT3dXbee8wuqjzkW+vtdyDo/hFGH5Hg7jZL65+Xcdctvp1c1T5yJjqgoT3EXtPTJe/j7jD3W3PdfFxLoo6n/Evhbrr5TM8Z5MOOxAkfUNcXxHTtZarYf9Y+m1QcuGn4ONLelN+e8i79ECQjNoEcWNgvS2n3V8f9PYrykVB/BhI3keSyjULx3ffta4KklyS4gtO3XvJmy+NVwXxl6S/me2qrfr9Kvk2K7Zfmc8P4i7Ja2aMH6CayhcSr+1VJzo1HV5HHzY+l8rL6kV+vzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVPoBCJ0UotLu1agAAAAASUVORK5CYII=",
        },
      ],
      charity: {
        name: "Random. Name",
        shop_avatar: {
          public_id: "test",
          url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEX///8AAAA/Pz+/v79/f38PDw/v7+/f399fX1+fn58vLy/Pz8+vr68fHx9vb29PT0+Pj480/a1MAAACz0lEQVR4nO3Y2WKqMBiFUcnEKPr+T1skM8FzKgF7860rGiw/O4QQuN0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECd8dkJIea+vapAK6VUapKy3DWpx1JbPU+o3d8bT0y+sdkjlh1i3YpnZPesm7L4B7Uef0hahjk9Y6N03NPXxRiHrLQwpwdRm8bZhBx57UdVDr0po8ergzSD2c3RzGfmWJKYq4M0g/3XedM8Hs9h7kURe7rXBrHtZtN4P54j1NCzlFPnj/i664TlLr77a/5NEC2iPhYRauHH0nrOvd0eJrPMarOuGVmtO64btH6cJV0jk/O0/htE7PeWykq8pq45bt5eE1jFyFJZjjiDhUn49CD+gDIcqWqq8uwdosN06Mt01wVxv1fhSMMJOdomKxFPU38lyLzttcP6bJDuNp0exMTB+7Sbzb3yke4rZLNe2+Tn+S7IVvrjSJZBurinDc8wPdettLqdHrRHDn10bhAzPdyZrzueyU+7mih704ZOu+/MIBl3XzySJl0xwER+0ntt1wTx86TJFimduR30V1dEx0fflK6R8i79QMU9MoRVSBEkWaKMu0FEdjtMsWf00fvEVtBp05h25T+CfD79BsXasO389HX0kfLV54gIS8ZyBLWPNxl/aSwPfOmT3dXbee8wuqjzkW+vtdyDo/hFGH5Hg7jZL65+Xcdctvp1c1T5yJjqgoT3EXtPTJe/j7jD3W3PdfFxLoo6n/Evhbrr5TM8Z5MOOxAkfUNcXxHTtZarYf9Y+m1QcuGn4ONLelN+e8i79ECQjNoEcWNgvS2n3V8f9PYrykVB/BhI3keSyjULx3ffta4KklyS4gtO3XvJmy+NVwXxl6S/me2qrfr9Kvk2K7Zfmc8P4i7Ja2aMH6CayhcSr+1VJzo1HV5HHzY+l8rL6kV+vzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVPoBCJ0UotLu1agAAAAASUVORK5CYII=",
        },
        ratings: 4.2,
      },
      price: 120,
      discount_price: 89,
      rating: 5,
      total_sell: 49,
      stock: 10,
      category:"Others"
    },

  ];
  
  export const footerDriveLinks = [
    {
      name: "About us",
      link: "/about"
    },
    {
      name: "Careers",
      link: "/carrers"
    },
    {
      name: "Store Locations",
    },
    {
      name: "Our Blog",
    },
    {
      name: "Reviews",
    },
  ];
  
  export const footercompanyLinks = [
    {
      name: "Game & Video",
    },
    {
      name: "Phone &Tablets",
    },
    {
      name: "Computers & Laptop",
    },
    {
      name: "Sport Watches",
    },
    // {
    //   name: "Events",
    // },
  ];
  
  export const footerSupportLinks = [
    // {
    //   name: "FAQ",
    // },
    {
      name: "Reviews",
    },
    {
      name: "Contact Us",
    },
    {
      name: "Shipping",
    },
    {
      name: "Live chat",
    },
  ];

