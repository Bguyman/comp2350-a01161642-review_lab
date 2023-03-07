const database = include('/databaseConnection');


async function getAllUsers() {
	let sqlQuery = `
		SELECT restaurant_id, name, description
		FROM restaurant;
	`;

	try {
		const results = await database.query(sqlQuery);
		console.log(results[0]);
		return results[0];
	}
	catch (err) {
		console.log("Error selecting from restaurant table");
		console.log(err);
		return null;
	}
}

async function addUser(postData) {
	let sqlInsertSalt = `  INSERT INTO restaurant (name, description)   VALUES (:name, :description);  `; 
	let params = { name: postData.name, description: postData.description }; 
	console.log(sqlInsertSalt); 
	try {
		const results = await database.query(sqlInsertSalt, params); 
		return true;
	} 
	catch (err) { 
		console.log(err); return false; 
	}
}

async function deleteUser(webUserId) { 
	let sqlDeleteUser = `   DELETE FROM restaurant  WHERE restaurant_id = :userID  `; 
	let params = { userID: webUserId }; 
	console.log(sqlDeleteUser); 
	try { await database.query(sqlDeleteUser, params); return true; 
	} 
	catch (err) { 
		console.log(err); 
		return false;
	 }
	 }

	 async function getReviewsById(establishment_id) {
		let params = { restaurant_id: establishment_id }
		let sqlQuery = `
			SELECT review_id, restaurant_id, reviewer_name, details, rating
			WHERE restaurant_id = :restaurant_id
			FROM review;
		`;
		
		try {
			const results = await database.query(sqlQuery, params);
			console.log(results[0]);
			return results[0];
		}
		catch (err) {
			console.log("Error selecting from restaurant table");
			console.log(err);
			return null;
		}
	}

	async function addReview(postData) {
		let sqlInsertSalt = `
	  INSERT INTO review (review_id, restaurant_id, reviewer_name, details, rating)
	  VALUES (:review_id, :restaurant_id, :reviewer_name, :details, :rating);
	  `;
		let params = {
		  review_id: postData.review_id,
		  restaurant_id: postData.restaurant_id,
		  reviewer_name: postData.reviewer_name,
		  details: postData.details,
		  rating: postData.rating,
		};
		console.log(sqlInsertSalt);
		try {
		  const results = await database.query(sqlInsertSalt, params);
		  console.log(results[0]);
		  return true;
		} catch (err) {
		  console.log(err);
		  return false;
		}
	  }

	async function deleteReview(webUserId) { 
		let sqlDeleteUser = `   DELETE FROM review  WHERE review_id = :reviewID  `; 
		let params = { reviewID: webUserId }; 
		console.log(sqlDeleteUser); 
		try { await database.query(sqlDeleteUser, params); return true; 
		} 
		catch (err) { 
			console.log(err); 
			return false;
		 }
		 }

module.exports = { getAllUsers, addUser, deleteUser, getReviewsById, addReview, deleteReview }
