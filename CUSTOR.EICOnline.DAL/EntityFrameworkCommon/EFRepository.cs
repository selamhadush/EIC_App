using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EntityFrameworkCommon
{
  public class EFRepository<TDBContext, TEntity> where TDBContext : DbContext where TEntity : class, new()
  {
    public TDBContext Context { get; set; }

    public EFRepository(TDBContext context)
    {
      Context = context;
    }

    private DbSet<TEntity> _dbSet;
    protected DbSet<TEntity> DbSet => _dbSet ?? (_dbSet = Context.Set<TEntity>());

    public TEntity Add()
    {
      TEntity entity = new TEntity();
      Context.Add<TEntity>(entity);
      return entity;
    }

    /// <summary>
    /// Expects an entity to be passed
    /// </summary>
    public T Add<T>() where T : class, new()
    {
      var entity = new T();
      Context.Add<T>(entity);
      return entity;
    }

    public virtual IEnumerable<TEntity> GetAll()
    {
      return Context.Set<TEntity>().AsEnumerable();
    }

    public virtual async Task<TEntity> GetRecord(object id)
    {
      object record = null;
      try
      {
        record = DbSet.Find(id);
        if (record == null)
        {
          SetError("No record was found with the provided key");
          return await Task.FromResult<TEntity>(null);
        }
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      var entity = record as TEntity;
      return await Task.FromResult<TEntity>(entity);
    }

    public virtual async Task<T> GetRecord<T>(object id) where T : class, new()
    {
      T record = null;
      try
      {
        var set = Context.Set<T>();
        record = set.Find(id);
        if (record == null)
        {
          SetError("No record was found with the provided key");
          return await Task.FromResult<T>(null);
        }
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      return await Task.FromResult<T>(record);
    }

    public async Task<bool> SaveAsync(TEntity entity = null)
    {
      if (entity != null)
      {
        if (AutoValidate && !Validate(entity))
          return false;

        var entry = Context.Entry(entity);
        if (entry.State == EntityState.Detached)
        {
          Context.Attach(entity);
          TEntity record = null;
          try
          {
            object id = Context.GetEntityKey(entity).FirstOrDefault();
            //object s = Context.GetEntityKey(entity)[0];
            try
            {
              if (Convert.ToInt32(id) > 0)//to-do should be improved
                record = DbSet.Find(id);
            }
            catch
            {
              record = DbSet.Find(id);
            }
          }
          catch
          {
            //do nothing
          }

          entry.State = record != null ? EntityState.Modified : EntityState.Added;
        }
      }

      int result = -1;
      try
      {
        result = await Context.SaveChangesAsync();
        if (result == -1)
          return false;
      }
      catch (Exception ex)
      {
        SetError(ex.GetBaseException());
        return false;
      }

      if (result == -1)
        return false;

      return true;
    }

    public async Task<bool> SaveAsync(TEntity entity, bool useTransaction)
    {
      if (useTransaction)
      {
        using (var tx = Context.Database.BeginTransaction())
        {
          if (await SaveAsync(entity))
          {
            tx.Commit();
            return true;
          }
          return false;
        }
      }

      return await SaveAsync(entity);
    }

    public bool Save(TEntity entity = null)
    {
      if (entity == null)
      {
        if (AutoValidate && !Validate(entity))
          return false;

        var entry = Context.Entry(entity);
        if (entry.State == EntityState.Detached)
        {
          Context.Attach(entity);
          var ids = Context.GetEntityKey(entity);
          if (ids != null && ids.Length > 0)
            entry.State = EntityState.Modified;
          else
            entry.State = EntityState.Added;
        }
      }

      try
      {
        int result = Context.SaveChanges();
        if (result == -1)
          return false;
      }
      catch (Exception ex)
      {
        SetError(ex.GetBaseException());
        return false;
      }

      return true;
    }

    public virtual bool Delete(object id, bool saveChanges = false)
    {
      TEntity entity = DbSet.Find(id);
      if (entity == null)
        return true;
      var dbSet = Context.Set<TEntity>();

      try
      {
        dbSet.Remove(entity);
        if (saveChanges)
          Context.SaveChanges();
      }
      catch (Exception ex)
      {
        SetError(ex, true);
        return false;
      }

      return true;
    }

    public virtual bool Delete(TEntity entity, bool saveChanges = true)
    {
      if (entity == null)
        return true;
      var dbSet = Context.Set<TEntity>();
      try
      {
        dbSet.Remove(entity);
        if (saveChanges)
          Context.SaveChanges();
      }
      catch (Exception ex)
      {
        SetError(ex, true);
        return false;
      }

      return true;
    }

    private ValidationErrorCollection _validationErrors;

    public ValidationErrorCollection ValidationErrors => _validationErrors ??
               (_validationErrors = new ValidationErrorCollection());

    /// <summary>
    /// If true,   the Validate method is automatically called in the Save() operation
    /// </summary>
    public bool AutoValidate { get; set; }

    /// <summary>
    /// Throw exceptions on save or return errors as messages?
    /// </summary>
    public bool ThrowExceptions { get; set; }

    /// <summary>
    /// Error Message of the last exception
    /// </summary>
    public string ErrorMessage
    {
      get => ErrorException == null ? "" : ErrorException.Message;
      set => ErrorException = string.IsNullOrEmpty(value) ? null : new Exception(value);
    }

    public Exception ErrorException { get; set; }

    public virtual bool Validate(TEntity entity)
    {
      ValidationErrors.Clear();
      bool isValid = OnValidate(entity);
      if (!isValid)
        SetError(ValidationErrors.ToString());
      return isValid;
    }

    protected virtual bool OnValidate(TEntity entity)
    {
      return ValidationErrors.Count < 1;
    }

    public void SetError(string Message)
    {
      if (string.IsNullOrEmpty(Message))
      {
        ErrorException = null;
        return;
      }

      ErrorException = new Exception(Message);
    }

    public void SetError(Exception ex, bool checkInnerException = false)
    {
      ErrorException = ex;

      if (checkInnerException)
      {
        while (ErrorException.InnerException != null)
        {
          ErrorException = ErrorException.InnerException;
        }
      }

      ErrorMessage = ErrorException.Message;
    }

    public void SetError()
    {
      ErrorException = null;
      ErrorMessage = null;
    }

    public virtual async Task<TEntity> GetRecord(object descEng, object serviceId)
    {
      object record = null;
      try
      {
        record = DbSet.Find(descEng, serviceId);
        if (record == null)
        {
          SetError("No record was found with the provided key");
          return await Task.FromResult<TEntity>(null);
        }
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      var entity = record as TEntity;
      return await Task.FromResult<TEntity>(entity);
    }
  }
}