package HouseWith.hwf.Exceptions.RequestExceptioons;

public class ArticleNotFoundException extends RuntimeException{
    public ArticleNotFoundException(String message){
        super(message);
    }
}
