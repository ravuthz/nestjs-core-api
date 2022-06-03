import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Note } from '../../note.entity';
import { NoteFactory } from '../factories/NoteFactory';

export class NoteSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const note1 = em.create(Note, {
      name: 'Note 1',
    });

    const note2 = new Note('Note 2');
    em.persist(note2);

    const factory = new NoteFactory(em);

    const note3 = factory.createOne();
    const notes = factory.create(5);

    console.log({
      note1,
      note2,
      note3,
      notes,
    });
  }
}
