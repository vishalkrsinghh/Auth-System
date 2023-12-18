

export default function(req,res){
    res.cookie("token","");
    return res.redirect("/");
}