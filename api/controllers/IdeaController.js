/**
 * IdeaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    addIdea: function (req, res) {  /* POSTed data */
        var title  = req.body ? req.body.title : undefined,
            detail = req.body ? req.body.detail : undefined;
        //technically - once policies in place, this if can be removed as this action couldn't be called unless the user is logged in.
        if ( ! req.user ) {
            return res.badRequest("Cannot add idea without a logged in user");
        } else if ( ! title && ! detail) {
            return res.badRequest("Need a title or detail to create idea");
        } else {
            Idea.create({ title: title || '', detail: detail || ''})
                .then( (idea) => {
                    req.user.ideas.add(idea);
                    req.user.save()
                        .then ( () => res.json(idea) )
                        .catch( (err) => { res.serverError(err) });
                })
                .catch( (err) => res.serverError(err));
            }
        }

};

