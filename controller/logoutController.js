

export default function(req,res){
    res.cookie("token","");
    req.flash('success', 'Loged out Successfully!')
    return res.redirect("/"); 
}