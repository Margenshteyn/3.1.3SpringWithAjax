package SpringWithAjax.web.dao;

import SpringWithAjax.web.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDAOImpl implements UserDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> getAllUsers() {
        return entityManager.createQuery("FROM User", User.class).getResultList();
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void updateUser(User user) {
        entityManager.merge(user);
    }

    @Override
    public void removeUser(long id) {
        entityManager.remove(getUserById(id));
    }

    @Override
    public User getUserById(long id) {
        return entityManager.find(User.class, id);
  /*      return (User)entityManager.createQuery("From User where id =:pId")
                .setParameter("pId", id)
                .getSingleResult();*/
    }

    @Override
    public User getUserByEmail(String email) {
        return (User) entityManager.createQuery("FROM User WHERE email =:e")
                .setParameter("e", email)
                .getSingleResult();
//       return entityManager.find(User.class, email);
    }

    @Override
    public boolean userExist(String email) {
        return getAllUsers()
                .stream()
                .anyMatch((e) -> e.getEmail().hashCode() == email.hashCode());
    }

}
