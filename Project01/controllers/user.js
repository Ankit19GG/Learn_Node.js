const User=require('../models/user')

async function getAllUsers(req,res){
    const allUsers= await User.find({})
    const html=`
    <ul>
    ${allUsers.map((user)=>`<li>${user.first_name} ${user.last_name}: ${user.email}</li>`).join("")}
    </ul>
    `
    return res.send(html);
}

async function getUserbyId(req,res) {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(404).send("User not found");
        res.setHeader("EmployeeName", "Nisha Koley");
        const html = `
        <ul>
          <li>${user.first_name} ${user.last_name}</li>
        </ul>
        `;
        return res.send(html);
}

async function updateUserById(req,res) {
  await User.findByIdAndUpdate(req.params.id,{last_name:"Changed"});
  return res.json({status:"success"});
};

async function deleteUserById(req,res) {
  console.log("Delete ID:", req.params.id); 
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({status:"user not found"});
    return res.json({status:"success"});
  } catch (err) {
    return res.status(400).json({status:"error", error: err.message});
  }
}

async function createUser(req,res) {
  const body = req.body;
        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.Job_Title) {
            return res.status(400).send("Insufficient Information");
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        Job_Title: body.Job_Title,
    });

    return res.status(201).json({ msg: "success",id: result._id });
}

module.exports={getAllUsers,getUserbyId,updateUserById,createUser,deleteUserById};